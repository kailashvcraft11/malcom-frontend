import {AfterViewInit, Component, Inject, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ApiService} from '../../../services/api.service';
import {NavigationService} from '../../../services/navigation.service';
import {LoginService} from '../../../services/login.service';
import {ErrorMessage} from '../../../utils/error-message';

@Component({
    selector: 'app-form-login',
    template: `
        <div>
            <span *ngIf="logged">
                <h3 mat-dialog-title>You're already logged in!</h3>
                <span
                        class="dynamic-field form-button">
                    <button
                            mat-raised-button
                            type="submit"
                            (click)="redirect()">
                        Continue
                    </button>
                </span>
            </span>
            <mat-tab-group *ngIf="!logged" mat-align-tabs="center" mat-stretch-tabs>

                <mat-tab label="Sign Up">
                    <form [formGroup]="signUpForm">
                        <h2 mat-dialog-title>
                            You're doing great!
                            <small>Sign up so that we can save your progress.</small>
                        </h2>
                        <div fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="10px">
                            <mat-form-field fxFlex="50">
                                <input
                                        matInput
                                        required
                                        type="text"
                                        name="first_name"
                                        formControlName="first_name"
                                        placeholder="First Name">
                                <mat-error *ngIf="signUpError.hasError('first_name')">{{ signUpError.getError('first_name') }}</mat-error>
                            </mat-form-field>
                            <mat-form-field fxFlex="50">
                                <input
                                        matInput
                                        required
                                        type="text"
                                        name="last_name"
                                        formControlName="last_name"
                                        placeholder="Last Name">
                                <mat-error *ngIf="signUpError.hasError('last_name')">{{ signUpError.getError('last_name') }}</mat-error>
                            </mat-form-field>
                        </div>
                        <div fxLayout="column" fxLayoutAlign="space-around center" fxLayoutGap="10px">
                            <mat-form-field fxFlex>
                                <input
                                        matInput
                                        required
                                        type="email"
                                        name="email"
                                        formControlName="email"
                                        placeholder="Email Address">
                                <mat-error *ngIf="signUpError.hasError('email')">{{ signUpError.getError('email') }}</mat-error>
                            </mat-form-field>
                            <br>
                            <mat-form-field fxFlex>
                                <input
                                        matInput
                                        required
                                        type="tel"
                                        name="phone"
                                        formControlName="phone"
                                        placeholder="Phone Number">
                                <mat-error *ngIf="signUpError.hasError('phone')">{{ signUpError.getError('phone') }}</mat-error>
                            </mat-form-field>
                        </div>
                        <div fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="10px">
                            <mat-form-field fxFlex="50">
                                <input
                                        matInput
                                        required
                                        type="password"
                                        name="password"
                                        formControlName="password"
                                        placeholder="Password">
                                <mat-error *ngIf="signUpError.hasError('password')">{{ signUpError.getError('password') }}</mat-error>
                            </mat-form-field>
                            <mat-form-field fxFlex="50">
                                <input
                                        matInput
                                        required
                                        type="password"
                                        name="password_confirm"
                                        formControlName="password_confirm"
                                        placeholder="Confirm Password">
                                <mat-error *ngIf="signUpError.hasError('password_confirm')">
                                    {{ signUpError.getError('password_confirm') }}
                                </mat-error>
                            </mat-form-field>
                        </div>
                        <button mat-raised-button color="accent" (click)="signUp()">Create Account</button>
                    </form>
                </mat-tab>

                <mat-tab label="Log In">
                    <form>
                        <h2 mat-dialog-title>
                            Welcome Back!
                            <small>Sign in to see your dashboard.</small>
                        </h2>
                        <div fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="10px" [formGroup]="loginForm">
                            <mat-form-field fxFlex="50">
                                <input
                                        matInput
                                        required
                                        ngDefaultControl
                                        formControlName="email"
                                        [name]="config.name"
                                        placeholder="Email Address"
                                        type="text">
                                <mat-error *ngIf="errorMessage.hasError('email')">{{ errorMessage.getError('email') }}</mat-error>
                            </mat-form-field>
                            <mat-form-field fxFlex="50">
                                <input
                                        matInput
                                        required
                                        ngDefaultControl
                                        formControlName="password"
                                        [name]="config.name"
                                        placeholder="Password"
                                        type="password">
                                <mat-error *ngIf="errorMessage.hasError('password')">{{ errorMessage.getError('password') }}</mat-error>
                            </mat-form-field>
                        </div>
                        <button mat-raised-button color="accent" (click)="logIn()">Log In</button>
                        <br>
                        <a (click)="resetPassword()" class="reset">Forgot your password?</a>
                    </form>
                </mat-tab>

            </mat-tab-group>
        </div>
    `,
    styleUrls: ['./form-login.component.sass']
})
export class FormLoginComponent implements OnInit {

    @Output() public loggedStatus: EventEmitter<any> = new EventEmitter<any>();
    @Input() public data: any = false;

    public config;
    public group: FormGroup = new FormGroup({});
    public firstName;
    public lastName;
    public emailAddress;
    public phoneNumber;
    public password;
    public passwordConfirm;
    public loginForm: FormGroup;
    public signUpForm: FormGroup;
    public errorMessage: ErrorMessage;
    public signUpError: ErrorMessage;

    public logged = false;

    constructor(
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
        private _login: LoginService,
        private _api: ApiService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        public navigation: NavigationService
    ) {
    }

    ngOnInit() {

        // Replace config with DATA if it's been provided
        if (this.data) {
            this.config = this.data;
        }

        if (this._storage.get('malcolmCurrentUser')) {
            this.logged = true;

            // If the user is logged in, redirect to the next page
            this.redirect();
        }

        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, [
                Validators.required,
            ]),
        });

        this.signUpForm = new FormGroup({
            first_name: new FormControl(null, [
                Validators.required,
            ]),
            last_name: new FormControl(null, [
                Validators.required,
            ]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            phone: new FormControl(null, [
                Validators.required,
            ]),
            password: new FormControl(null, [
                Validators.required,
            ]),
            password_confirm: new FormControl(null, [
                Validators.required,
            ]),
        });

        this.errorMessage = new ErrorMessage(this.loginForm);
        this.signUpError = new ErrorMessage(this.signUpForm);
    }

    signUp() {
        this.signUpError.setErrors();
        this.signUpError.setMessages();

        const errors = this.signUpError.getErrors();

        if (errors.length) {
            return;
        }

        const first_name = this.signUpForm.get('first_name').value;
        const last_name = this.signUpForm.get('last_name').value;
        const phone_number = this.signUpForm.get('phone').value;
        const email = this.signUpForm.get('email').value;
        const password = this.signUpForm.get('password').value;
        const password_confirm = this.signUpForm.get('password_confirm').value;

        const body = {
            first_name,
            last_name,
            phone_number,
            email,
            password,
            password_confirm,
        };

        this._api.createUser(body).subscribe((data: any) => {
            this._updateUserLogged(data, data.message);
        });
    }

    logIn() {
        this.errorMessage.setErrors();
        this.errorMessage.setMessages();

        const errors = this.errorMessage.getErrors();

        if (errors.length) {
            return;
        }

        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;

        this._login.logIn(email, password, (e) => {
            this._updateUserLogged(e, `We weren't able to log you in.`);
        });
    }

    resetPassword() {
        const dialogRef = this._dialog.open(FormLoginResetComponent, {
            data: {
                width: '350px',
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    redirect() {
        if (this.config.target) {
            this.navigation.updateFlowPage(this.config.target);
        }
    }

    private _updateUserLogged(data: any, message: string) {
        if (!data.success) {
            this._snackBar.open(message, '', {
                duration: 3500
            });
            return;
        } else {
            this.logged = true;
            this.loggedStatus.emit(this.logged);

            if (this.config.target) {
                this.navigation.updateFlowPage(this.config.target);
            }
        }
    }


}

@Component({
    selector: 'app-form-login-reset',
    template: `
        <div class="reset">
            <h2 mat-dialog-title>Reset your password</h2>
            <div [formGroup]="form">
                <mat-form-field>
                    <input
                            matInput
                            type="email"
                            name="email"
                            formControlName="email"
                            placeholder="Email Address">
                    <mat-error *ngIf="formValidation.hasError('email')">{{ formValidation.getError('email') }}</mat-error>
                </mat-form-field>
            </div>
            <button mat-raised-button color="primary" (click)="resetPassword()">Log In</button>
        </div>
    `,
    styleUrls: ['./form-login.component.sass']
})
export class FormLoginResetComponent implements OnInit {
    public form: FormGroup;
    public formValidation: ErrorMessage;

    constructor(
        private _login: LoginService,
        public dialogRef: MatDialogRef<FormLoginResetComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
        });

        this.formValidation = new ErrorMessage(this.form);
    }

    resetPassword() {
        this.formValidation.setErrors();
        this.formValidation.setMessages();

        const errors = this.formValidation.getErrors();

        if (errors.length) {
            return;
        }

        const email = this.form.controls['email'].value;

        this._login.resetPassword(email, () => {
            this.dialogRef.close();
        });
    }
}
