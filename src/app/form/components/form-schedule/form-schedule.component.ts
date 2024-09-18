import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InputsService} from '../../../services/inputs.service';
import {NavigationService} from '../../../services/navigation.service';
import {ApiService} from '../../../services/api.service';
import {forkJoin} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorMessage} from '../../../utils/error-message';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
@Component({
    selector: 'app-form-schedule',
    templateUrl: './form-schedule.component.html',
    styleUrls: ['./form-schedule.component.sass']
})
export class FormScheduleComponent implements OnInit {

    config;
    group: FormGroup;
    emailForm: FormGroup;
    emailGroupForm: FormGroup;

    public showOtherActivity = false;
    public rows = [{
        day: '',
        type: '',
        time: '',
        activity: '',
        location: '',
        invite: '',
    }];

    public placeholderDay = 'Select a Day';
    public fieldsetDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    public fieldsetType = ['Routine', 'Backup'];
    public placeholderType = 'Type of Day';

    public fieldsetTimes = [];
    public placeholderTime = 'Select a Time';

    public fieldsetActivityType = [];
    public placeholderActivityType = 'Select an Activity Type';
    public placeholderLocale = 'Where will this take place?';
    public placeholderEmails = 'Email address(es) (ex. joe@email.com, jane@email.com)';
    public emailFormValidation: ErrorMessage;
    public emailGroupFormValidation: ErrorMessage = null;

    constructor(
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
        private _inputs: InputsService,
        private _dialog: MatDialog,
        private _api: ApiService,
        private _snack: MatSnackBar,
        public navigation: NavigationService,
    ) {
        this.fieldsetTimes = this._buildTimeOptions();
    }

    ngOnInit() {

        const input = this._inputs.getInputByName(this.config.name);

        if (input && input.label) {
            this.rows = JSON.parse(input.label);
        }

        if (this.config.compared) {
            this._buildActivitySelected();
        }

        this.emailForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
        });

        this.emailGroupForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
            ]),
            message: new FormControl(),
        });

        this.emailFormValidation = new ErrorMessage(this.emailForm);
        this.emailGroupFormValidation = new ErrorMessage(this.emailGroupForm);
    }

    addNewRow() {
        // TODO: Add true inputs
        this.rows.push({
            day: '',
            type: '',
            time: '',
            activity: '',
            location: '',
            invite: ''
        });
    }

    updateInput() {
        this.group.setControl(this.config.name, new FormControl(JSON.stringify(this.rows)));
    }

    checkActivityOtherValue(index) {
        if (this.rows[index].activity === 'other') {
            this.showOtherActivity = true;
            this.rows[index].activity = '';
        } else {
            this.showOtherActivity = false;
        }
    }

    create() {
        this.emailGroupFormValidation.setErrors();
        this.emailGroupFormValidation.setMessages();

        const errors = this.emailGroupFormValidation.getErrors();
        let email = this._storage.get('malcolmCurrentUserEmail');

        // if (errors.length) {
        //     return;
        // }

        // If the email address is not yet available, prompt the user to add one
        const dialogRef = this._dialog.open(FormScheduleConfirmComponent, {
            width: '450px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                // Collect the new email address from storage
                email = result.email ? result.email : email;

                // Send an email
                if (result.submit) {
                    this._submitAllActivityEmails(email);
                }
            }
        });
    }

    /**
     * Redirect to a new page by target ID given in config
     */
    redirect() {
        this.navigation.updateFlowPage(this.config.target);
    }

    /**
     * Submit all of the emails when the schedule is approved
     * @param {string} email
     * @private
     */
    private _submitAllActivityEmails(email: string) {
        const individual = this._submitUserActivityList(email);
        const group = this._submitGroupActivityList(email);

        forkJoin(individual, group).subscribe((result: any[]) => {
            if (result[0].success && result[1].success) {
                this._snack.open('We have sent you a confirmation email!', '', {
                    duration: 3000
                });
                this.redirect();
            } else {
                result.forEach(item => {
                    if (!item.success) {
                        this._snack.open(item.message);
                    }
                });
            }
        });
    }

    private _submitUserActivityList(email: string) {

        const input = new FormData();
        input.append('email', email);
        input.append('activities', this._organizeUserEvents(this.rows));

        return this._api.sendIndividualScheduleEmail(input);
    }

    private _submitGroupActivityList(email: string) {

        const input = new FormData();
        input.append('email', email);
        input.append('activities', this._organizeInviteEvents(this.rows));

        return this._api.sendGroupScheduleEmail(input);
    }

    private _organizeUserEvents(rows) {

        const array = [];
        const today = new Date();

        for (let i = 0; rows.length > i; i++) {

            const datetimes = this._getDateTimes(rows[i].day, rows[i].time);
            array.push({
                start_date: datetimes.start, // TODO: Fix dates
                end_date: datetimes.start,
                location: rows[i].location,
                summary: rows[i].activity,
                description: `${rows[i].activity} at ${rows[i].location}.` // TODO: Create description
            });
        }
        return JSON.stringify(array);
    }

    private _organizeInviteEvents(rows) {

        const array = [];

        // Iterate through each row
        for (let i = 0; rows.length > i; i++) {

            // Get all emails given from the row
            const emails = rows[i].invite.split(',');

            // Add unique email addresses to the object and assign all events to that array
            for (let email of emails) {

                email = email.trim();

                // Check whether the email exists.  If it does, set the index.
                let index = null;
                for (let a = 0; array.length > a; a++) {
                    if (array[a].email === email) {
                        index = a;
                        break;
                    }
                }
                let recipient = index !== null ? array[index] : null;

                // If group is empty, add the email
                if (!recipient) {
                    recipient = {
                        email: email,
                        events: []
                    };

                    // Assign to the array
                    array.push(recipient);
                }

                // Build the event
                const datetimes = this._getDateTimes(rows[i].day, rows[i].time);
                recipient.events.push({
                    start_date: datetimes.start,
                    end_date: datetimes.end,
                    location: rows[i].location,
                    summary: rows[i].activity, // TODO: Improve summary
                    description: `${rows[i].activity} at ${rows[i].location}.` // TODO: Create description
                });
            }
        }
        return JSON.stringify(array);
    }

    private _getDateTimes(day, time) {

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Get the current day
        const date = new Date();
        const today = date.getDay();
        const newDay = days.indexOf(day);
        const difference = (newDay - today) >= 0 ? newDay - today : 7 - (today - newDay);
        const newTime = this._convertTo24Hour(time).split(':');

        // Create a new date with the revised time
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + difference);
        startDate.setHours(newTime[0], newTime[1]);

        // Sent the end time to 1 hour in the future
        const endDate = new Date(+startDate);
        endDate.setHours(endDate.getHours() + 1);

        // Return a unix datetime
        return {
            start: startDate.toISOString(),
            end: endDate.toISOString()
        };
    }

    /**
     * Convert times from 12 hour to 24 hour
     * @param time
     * @returns {any}
     * @private
     */
    private _convertTo24Hour(time) {
        const hours = parseInt(time.substr(0, 2));
        if (time.indexOf('am') !== -1 && hours === 12) {
            time = time.replace('12', '0');
        }
        if (time.indexOf('pm') !== -1 && hours < 12) {
            time = time.replace(hours, (hours + 12));
        }
        return time.replace(/(am|pm)/, '');
    }

    /**
     * Build the list of times
     * @returns {any[]}
     * @private
     */
    private _buildTimeOptions() {
        const result = [];
        for (let h = 1; h <= 24; h++) {
            for (let m = 0; m < 2; m++) {
                result.push((h > 12 ? h - 12 : h) + ':' + (m === 0 ? '00' : (m * 30)) + (h >= 12 ? 'pm' : 'am'));
            }
        }
        return result;
    }

    /**
     * Build a list of activities from selected options
     * @private
     */
    private _buildActivitySelected() {

        this.fieldsetActivityType = [];

        if (this.config.compared) {

            // If compared is sent as JSON, parse to array
            if (this._isJson(this.config.compared)) {
                const compared = JSON.parse(this.config.compared);
                for (let i = 0; compared.length > i; i++) {
                    this._inputs.getInputComparisonByNameDb(compared[i]).then((response: any) => {
                        if (response) {
                            for (let g = 0; response.length > g; g++) {
                                this.fieldsetActivityType.push(response[g].label);
                            }
                        }
                    });
                }
            } else {

                // Attempt to get comparison locally
                const comparison = this._inputs.getInputComparisonByName(this.config.compared);
                if (comparison.length > 0) {
                    for (let i = 0; comparison.length > i; i++) {
                        this.fieldsetActivityType.push(comparison[i].label);
                    }
                }

                // Attempt to get comparison from DB
                // if (!this.fieldsetActivityType.length) {
                //     this._inputs.getInputComparisonByNameDb(this.config.compared).then((response: any) => {
                //         if (response) {
                //             for (let i = 0; response.length > i; i++) {
                //                 this.fieldsetActivityType.push(response[i].label);
                //             }
                //         }
                //     });
                // }
            }
        }
    }

    private _isJson(string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }
}

@Component({
    selector: 'app-form-schedule-confirm',
    template: `
        <div class="text-center">
            <h2>All set?</h2>
            <p>If you're happy with your selections, we'll email you your schedule, as well as email your schedule to any invitees you've
                added.</p>
            <button
                    mat-raised-button
                    type="button"
                    color="primary"
                    (click)="confirm()"
                    ngDefaultControl>
                I'm all set!
            </button>
            <button
                    mat-raised-button
                    type="button"
                    (click)="cancel()"
                    ngDefaultControl>
                I'm not ready yet.
            </button>
        </div>
    `,
    styles: [`
        p {
            margin-bottom: 1em;
        }

        button:not(:last-of-type) {
            margin-right: 0.5em;
        }
    `]
})
export class FormScheduleConfirmComponent {

    public value: string;

    constructor(
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
        private _dialog: MatDialog,
        public dialogRef: MatDialogRef<FormScheduleConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    confirm() {

        if (!this._storage.get('malcolmCurrentUserEmail')) {
            const dialogRef = this._dialog.open(FormScheduleEmailDialogComponent, {});

            dialogRef.afterClosed().subscribe(result => {

                // Collect the new email address from storage
                if (result) {
                    this.dialogRef.close({
                        email: result.email,
                        submit: true
                    });
                }
            });
        } else {
            // Close the dialog box
            this.dialogRef.close({
                submit: true
            });
        }
    }

    cancel() {
        this.dialogRef.close({
            submit: false
        });
    }
}

@Component({
    selector: 'app-form-schedule-email-dialog',
    template: `
        <div class="text-center">
            <h2>Please provide your email address</h2>
            <p>We need to know where to send your confirmation email.</p>
            <mat-form-field class="dynamic-field form-input">
                <input
                        #email
                        matInput
                        type="text"
                        placeholder="Email Address"
                        mask="A*@A*.SSS"
                        [patterns]="pattern"
                        required="required"
                        ngDefaultControl/>
            </mat-form-field>
            <button
                    mat-raised-button
                    type="submit"
                    (click)="formSubmit(email.value)"
                    ngDefaultControl>
                Submit
            </button>
        </div>
    `,
    styles: [`
        p {
            margin-bottom: 1em;
        }

        .mat-form-field {
            margin-right: 0.5em;
        }
    `]
})
export class FormScheduleEmailDialogComponent {

    public value: string;
    public pattern = {
        'A': {pattern: new RegExp('[a-zA-Z0-9_.]')}
    };

    constructor(
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
        public dialogRef: MatDialogRef<FormScheduleEmailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    formSubmit(value) {

        // Add the email address to local storage
        this._storage.set('malcolmCurrentUserEmail', value);

        // Close the dialog box
        this.dialogRef.close({
            email: value
        });
    }
}
