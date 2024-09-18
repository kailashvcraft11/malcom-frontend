import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    Renderer2,
    ElementRef,
    ViewChild,
    HostListener
} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {NavigationService} from './services/navigation.service';
import {PointsService} from './services/points.service';
import {Subscription} from 'rxjs';
import {ApiService} from './services/api.service';
import {ResponseInterface} from './interfaces/response.interface';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';import {AssignmentService} from './services/assignment.service';
import {LoginService} from './services/login.service';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';

import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

export interface DialogData {
    something: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

    public background: string;
    public showPoints = false;
    public points = 0;
    public sponsor = false;
    public sponsorUrl: string;
    public logged: boolean;
    public logo = 'assets/images/DOC-gold-2tone.svg';
    private _navigationSubscription: Subscription;
    private _pointsSubscription: Subscription;
    private _assignmentSubscription: Subscription;

    constructor(
        private _navigation: NavigationService,
        private _dialog: MatDialog,
        private _points: PointsService,
        private _cd: ChangeDetectorRef,
        private _route: ActivatedRoute,
        private _router: Router,
        private _renderer: Renderer2,
        private _api: ApiService,
        private _assignment: AssignmentService,
        private _login: LoginService,
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
        angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag
    ) {
        angulartics2GoogleGlobalSiteTag.startTracking();
    }

    ngOnInit() {
        this.updateTheme();
        this._isUserLoggedIn();

        // Add the session identification
        if (this._storage.get('elation-uuid')) {
            this._storage.set('elation-uuid', this._generateUuid());
        }

        // Get the URL params
        this._router.events.subscribe(val => {
            if (val instanceof RoutesRecognized) {
                const params = val.state.root.firstChild.params;
                this._api.accountId = params.accountId;
                this._api.accountFlow = params.flow;
                this._api.accountAssignment = params.id;

                // When the account ID is set, get the account data
                if (this._api.accountId) {
                    this._storage.set('malcolmCurrentAccount', this._api.accountId);

                    // Get account options
                    this._api.getAccount(this._api.accountId).subscribe((response: ResponseInterface) => {
                        if (response.success) {
                            const result = response.result;
                            if (result.logo_url && result.logo_url !== '') {
                                // TODO - restore
                                // this.logo = result.logo_url;
                            }
                        }
                    });
                }
            }
        });

        // Get the assignment
        // TODO: currently not in use
        // this._assignmentSubscription = this._assignment.getAssignment().subscribe(result => {
        //     if (result) {
        //         this._api.getAssignment(result).subscribe((response: ResponseInterface) => {
        //             if (response.success) {
        //                 if (response.result.logo) {
        //                     this.sponsorUrl = response.result.logo;
        //                     this.sponsor = true;
        //                 }
        //             }
        //         });
        //     }
        // });

        // Get the point totals
        // TODO: this should probably be moved to the dashboard
        // this._pointsSubscription = this._points.showPoints().subscribe(result => {
        //     if (!result) {
        //         this.showPoints = result;
        //         this._cd.detectChanges();
        //         return;
        //     }
        //
        //     const user = JSON.parse(this._storage.get('malcolmCurrentUser'));
        //
        //     if (user) {
        //         this._api.getUserPoints(user.user.unique_id).subscribe((response: ResponseInterface) => {
        //             if (response.success) {
        //                 this.points = response.result.count;
        //                 this.showPoints = result;
        //                 this._cd.detectChanges();
        //             }
        //         });
        //     }
        // });
    }

    @HostListener('window:message', ['$event'])
    getReloadEvent(event: MessageEvent) {
        if (!event.origin.indexOf('//localhost:4200') && !event.origin.indexOf('//admin.elation.com') && !event.origin.indexOf('//admin.elation.dev')) {
            return;
        }
        if (event.data === 'reload') {
            window.location.reload();
        }
    }

    openMenu(): void {
        const dialogRef = this._dialog.open(DialogMenuComponent, {
            width: '80%',
            data: {},
            panelClass: 'dashboard-menu',
            backdropClass: 'dark'
        });
    }

    /**
     * Assign an updated theme to the page by flow page
     */
    updateTheme() {
        this._navigationSubscription = this._navigation.getTheme()
            .subscribe(data => {

                document.body.style.backgroundImage = data.background ? 'url(' + data.background + ')' : '';

                // Add a theme to the body
                document.body.removeAttribute('data-theme');
                if (data.theme) {
                    document.body.setAttribute('data-theme', data.theme);
                }
            });
    }

    ngOnDestroy() {
        this._navigationSubscription.unsubscribe();
        this._pointsSubscription.unsubscribe();
    }

    private _isUserLoggedIn() {
        this.logged = this._login.isLogged();
    }

    private _generateUuid() {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            // tslint:disable-next-line:no-bitwise
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}

@Component({
    selector: 'app-dialog-menu',
    styleUrls: ['./app.component.sass'],
    template: `
        <nav>
            <ul>
                <li (click)="goToRouterLink('dashboard')">
                    <a>My Dashboard</a>
                </li>
                <li *ngIf="logged" (click)="logOut()" class="logout"><a>Log Out</a></li>
            </ul>
            <a #close (click)="onNoClick()" class="close"></a>
        </nav>
    `
})
export class DialogMenuComponent implements OnInit {

    @ViewChild('close') el: ElementRef;
    public logged = false;

    constructor(
        public navigation: NavigationService,
        public dialogRef: MatDialogRef<DialogMenuComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _render: Renderer2,
        private _login: LoginService,
        private _navigation: NavigationService,
        private _router: Router
    ) {
    }

    ngOnInit() {

        this._isUserLoggedIn();
        const $this = this;

        // After the the view is complete, show the close button
        setTimeout(function () {
            $this._render.addClass($this.el.nativeElement, 'show');
        }, 500);
    }

    goToRouterLink(routerLink: string) {
        this._router.navigate([`/${routerLink}`]).then(() => {
            this.onNoClick();
        });
    }

    logOut(): void {
        this._login.logOut();
        this._resetAssignmentPosition();
        this.onNoClick();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    private _isUserLoggedIn(): void {
        this.logged = this._login.isLogged();
    }

    /**
     * Redirects the user back to the first page of the assignment
     * @private
     */
    private _resetAssignmentPosition(): void {
        this._navigation.updateFlowPage(null, true);
    }
}
