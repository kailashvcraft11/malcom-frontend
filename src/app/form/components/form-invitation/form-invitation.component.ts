import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';
import {ErrorMessage} from '../../../utils/error-message';

@Component({
    selector: 'app-form-invitation',
    template: `
        <section class="fieldset-wrapper">
            <div *ngFor="let row of rows; let i = index;" [formGroup]="formArray.controls[i]">
                <div class="h3">{{row}}</div>
                <div
                        fxLayout="row"
                        fxLayout.xs="column"
                        fxLayoutAlign="center"
                        class="row">
                    <mat-form-field
                            fxFlex="35"
                            class="dynamic-field form-input">
                        <input
                                matInput
                                type="text"
                                placeholder="Email address (ex. joe@email.com, susan@email.com)"
                                formControlName="email"
                                ngDefaultControl
                                (change)="check(i)">
                        <mat-error *ngIf="formValidations[i].hasError('email')">{{ formValidations[i].getError('email') }}</mat-error>
                    </mat-form-field>

                    <mat-form-field
                            fxFlex
                            class="dynamic-field form-input">
                        <input
                                matInput
                                type="text"
                                placeholder="Message (optional)"
                                formControlName="message"
                                ngDefaultControl>
                    </mat-form-field>

                </div>
            </div>
        </section>
    `,
    styleUrls: ['./form-invitation.component.sass']
})
export class FormInvitationComponent implements OnInit {

    public config;
    public group: FormGroup = new FormGroup({});
    public comparison = [];
    public form: FormGroup;
    public formArray: FormArray;
    public formValidations: ErrorMessage[] = [];

    // TODO: get rows from schedule
    public rows = [
        'Sunday, 4:00 PM, Martial Arts, Jake\'s Martial Arts Center',
        'Tuesday, 5:30 AM, Yoga, YMCA Downtown',
        'Thursday, 5:30 AM, Yoga, YMCA Downtown',
        'Saturday, 5:30 AM, Yoga, YMCA Downtown'
    ];

    constructor(
        private _inputs: InputsService
    ) {
    }

    ngOnInit() {
        this.comparison = this._inputs.getComparisonObject(this.config.compared);

        const inputs = [];

        this.rows.forEach(row => {
            const form = new FormGroup({
                email: new FormControl(null, [
                    Validators.required,
                    Validators.email
                ]),
                message: new FormControl(),
            });

            inputs.push(form);
            this.formValidations.push(new ErrorMessage(form));
        });

        this.form = new FormGroup({
            inputs: new FormArray(inputs),
        });

        this.formArray = <FormArray>this.form.controls['inputs'];
    }

    check(index: number): void {
        const validation = this.formValidations[index];

        validation.setErrors();
        validation.setMessages();
    }
}
