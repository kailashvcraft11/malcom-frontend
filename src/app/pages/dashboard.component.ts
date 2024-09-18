import {Component, Inject, isDevMode, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {NavigationService} from '../services/navigation.service';
import {environment} from '../../environments/environment';

interface ResponseInterface {
    message: string;
    result: any;
    success: boolean;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

    config;
    group: FormGroup;

    public logged = false;
    public user: any;
    public assignments = [];
    public learning = [];
    public iconDefault = this._sanitizer.bypassSecurityTrustStyle(
        'url(https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/fourcore.svg)'
    );
    public columnWidth = 33;
    private _BASE_URL = environment.baseUrl;

    constructor(
        @Inject(LOCAL_STORAGE) private _localStorage: WebStorageService,
        private _navigation: NavigationService,
        private _sanitizer: DomSanitizer,
        private _api: ApiService,
        private _dialog: MatDialog
    ) {
    }

    ngOnInit() {

        this._navigation.updateTheme({
            background: './assets/images/backgrounds/dashboard.jpg',
            theme: 'dark'
        });

        // If the user is not yet logged in, prompt them to log in
        if (!this._localStorage.get('malcolmCurrentUser')) {
            const dialogRef = this._dialog.open(DashboardLoginDialogComponent, {
                width: '450px',
                disableClose: true
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this._updateAssignmentsByUser();
                }
            });
        } else {
            this._updateAssignmentsByUser();
        }

        // Retrieve the user's assignments
        this.columnWidth = 2 >= 3 ? 33 : 50;

        // Get the user's newsfeed
        this._getLearningByCategoryId(null);
    }

    convertUnixToDateTime(timestamp) {
        const a = new Date(timestamp),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            year = a.getFullYear(),
            month = months[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes(),
            time = date + ' ' + month + ' ' + year + ' @ ' + hour + ':' + (min < 10 ? '0' + min : min);

        return time;
    }

    getAccountId() {
        return this._localStorage.get('elation-malcolm-account');
    }

    private _updateAssignmentsByUser() {
        this.logged = true;
        this.user = JSON.parse(this._localStorage.get('malcolmCurrentUser')).user;
        this._api.getAssignmentsByUser(this.user.unique_id).subscribe((response: ResponseInterface) => {
            console.log(response);
            this.assignments = response.result;

            // Trust the icon urls
            for (const k in this.assignments) {
                if (this.assignments.hasOwnProperty(k)) {
                    const assignment = this.assignments[k].assignment;
                    if (assignment.logo) {
                        assignment.logoPath = this._sanitizer.bypassSecurityTrustStyle(`url(${assignment.logo})`);
                    }
                }
            }
        });
    }

    private _getLearningByCategoryId(categories: any) {
        this._api.getPosts(categories).subscribe((response: ResponseInterface) => {
            if (response.success) {
                this.learning = response.result;
                console.log(this.learning);
            }
        });
    }
}

@Component({
    selector: 'app-dashboard-login-dialog',
    template: `
        <app-form-login class="login-dialog" [data]="data" (loggedStatus)="verifyLoggedStatus($event)"></app-form-login>
    `,
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardLoginDialogComponent implements OnInit {

    public data = {
        name: 'loginDashboard',
        target: false
    };

    constructor(
        public dialogRef: MatDialogRef<DashboardLoginDialogComponent>,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {

    }

    verifyLoggedStatus(event) {
        if (event) {
            this._snackBar.open('You\'ve been successfully logged in!', '', {
                duration: 2500
            });
            this.dialogRef.close(true);
        }
    }
}
