import {FormGroup} from '@angular/forms';

export class ErrorMessage {
    private messages = [];
    private errors = [];

    constructor(private form: FormGroup) {
    }

    setMessages(): void {
        const errors = this.errors;
        const messages = [];

        errors.forEach(error => {
            if (typeof this[error] === 'function') {
                messages.push(this[error]());
            }
        });

        this.messages = messages;
    }

    setErrors(): void {
        const controls = this.form.controls;
        const errors = [];

        for (const control in controls) {
            if (controls.hasOwnProperty(control)) {
                controls[control].markAsTouched();

                if (this.hasError(control)) {
                    for (const error in controls[control].errors) {
                        if (controls[control].errors.hasOwnProperty(error)) {
                            errors.push(error);
                        }
                    }
                }
            }
        }

        this.errors = errors;
    }

    getErrors(): string[] {
        return this.errors;
    }

    hasError(key: string): boolean {
        const control = this.form.controls[key];

        return control.invalid && (control.dirty || control.touched);
    }

    getError(key: string): string {
        const control = this.form.controls[key];
        const errors = [];

        for (const error in control.errors) {
            if (control.errors.hasOwnProperty(error)) {
                errors.push(error);
            }
        }

        return this.messages[0];
    }

    required(): string {
        return 'This field is required.';
    }

    email(): string {
        return 'This is not a valid email address.';
    }
}
