import {Component, ViewContainerRef, ViewEncapsulation, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../services/api.service';
import {ResponseInterface} from '../../../interfaces/response.interface';

export interface DialogData {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    content: string;
    image: string;
}

@Component({
    selector: 'app-form-coaches',
    template: `
        <article
                fxLayout="row"
                fxLayout.xs="column"
                fxLayoutAlign="space-around start"
                fxLayoutGap="20px"
                class="coach">
            <mat-card *ngFor="let coach of coaches" (click)="selectCoach(coach.id)" fxFlex class="coach-card">

                <mat-card-header>
                    <!--<div mat-card-avatar [style.backgroundImage]="'url('+coach.profile_image_url+')'" class="coach-image"></div>-->
                    <mat-card-title>{{coach.first_name}} {{ coach.last_name }}</mat-card-title>
                    <mat-card-subtitle>Coach</mat-card-subtitle>
                </mat-card-header>

                <div
                        class="mat-card-image"
                        [style.backgroundImage]="coach.profile_image_url
                            ? 'url('+coach.profile_image_url+')'
                            : 'url(./assets/images/placeholder-person.jpg)'"
                        title="{{coach.name}}"></div>

                <mat-card-content *ngIf="coach.biography">
                    <p [innerHTML]="coach.biography"></p>
                </mat-card-content>

                <mat-card-actions>
                    <a (click)="scheduleCoach(coach)" mat-button color="accent" target="_blank">Schedule a Session</a>
                </mat-card-actions>

            </mat-card>
        </article>
    `,
    styleUrls: ['./form-coaches.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class FormCoachesComponent implements OnInit {
    config;
    group: FormGroup = new FormGroup({});

    public coaches = [];
    private _selectedCoachId: number;

    constructor(
        private _dialog: MatDialog,
        private _api: ApiService,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this._api.getCoaches(this.config.id).subscribe((response: ResponseInterface) => {
            if (response.success) {
                this.coaches = response.result;
            }
        });
    }

    selectCoach(id: number): void {
        this._selectedCoachId = id;
    }

    scheduleCoach(data: any): void {
        const dialogRef = this._dialog.open(FormCoachesScheduleComponent, {
            width: '450px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {

            if (typeof result === 'undefined') {
                return;
            }

            const input = new FormData();
            input.append('name', data.first_name);
            input.append('email', data.email);
            input.append('studentName', result.name);
            input.append('studentEmail', result.email);
            input.append('message', result.message);

            return this._api.sendCoachMessageEmail(input).subscribe((response: ResponseInterface) => {

                let message = 'Your message has been sent';
                if ( ! response.success) {
                    message = 'There was a problem sending your message.';
                }

                this._snackBar.open(message, '', {
                    duration: 3500
                });
            });
        });
    }
}

@Component({
    selector: 'app-form-coaches-schedule',
    template: `
        <h2>Schedule a session with {{data.first_name}}</h2>
        <p>Email {{data.name}} at <a href="mailto:{{data.email}}">{{data.email}}</a> or complete the form below:</p>
        <form>
            <div class="fieldset-wrapper">
                <mat-form-field>
                    <input [(ngModel)]="name" matInput class="rounded" name="name" placeholder="Your Name" value>
                </mat-form-field>
                <mat-form-field>
                    <input [(ngModel)]="email" matInput class="rounded" name="email" placeholder="Email Address" value>
                </mat-form-field>
                <mat-form-field>
                    <textarea [(ngModel)]="message" matInput class="rounded" name="message" placeholder="Your message"></textarea>
                </mat-form-field>
                <br>
            </div>
            <button (click)="closeDialog()" mat-raised-button color="primary">Submit</button>
        </form>
    `,
    styleUrls: ['./form-coaches.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class FormCoachesScheduleComponent {

    public name: string;
    public email: string;
    public message: string;

    constructor(
        public dialogRef: MatDialogRef<FormCoachesScheduleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    closeDialog(): void {
        this.dialogRef.close({
            name: this.name,
            email: this.email,
            message: this.message
        });
    }
}