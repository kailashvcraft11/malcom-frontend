import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';

@Component({
    selector: 'app-form-select',
    styleUrls: ['form-select.component.sass'],
    template: `
        <mat-form-field
                class="dynamic-field form-select"
                [formGroup]="group">
            <mat-select
                    [formControlName]="config.name"
                    [placeholder]="config.label">
                <mat-option *ngFor="let option of config.options" [value]="option.value ? option.value : option.label">
                    {{ option.label }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `
})
export class FormSelectComponent implements OnInit {
    config;
    group: FormGroup;

    public value: string;

    constructor(
        private _inputs: InputsService
    ) {
    }

    ngOnInit() {
        let value = this._inputs.getInputByName(this.config.name);
        this.group.get(this.config.name).setValue(value);

        if (!this.value) {
            this._inputs.getInputByNameDb(this.config.name).then((data: any) => {
                value = data.interaction;
                this.group.get(this.config.name).setValue(value);
            });
        }

        this._decodeValueObject();
    }

    /**
     * Value may be passed as two integers.  If that's the case, then interpolate and count up
     *
     * @private
     */
    private _decodeValueObject() {
        let result = [];
        const values = this.config.options;

        if (typeof values !== 'undefined') {

            // If an object is given, this should be a range of numbers, and we'll iterate
            if (typeof values[0].values === 'object') {

                const value = values[0].values;
                let reverse = false;
                let min = value[0];
                let max = value[1];

                if (value[0] > value[1]) {
                    min = value[1];
                    max = value[0];
                    reverse = true;
                }

                for (let i = min; max >= i; i++) {
                    result.push({
                        'value': i,
                        'option': i
                    });
                }
                if (reverse) {
                    result.reverse();
                }
            } else {
                result = values;

                values.forEach(value => {
                    if (value.default) {
                        this.group.get(this.config.name).setValue(value.value ? value.value : value.label);
                    }
                });
            }
            this.config.options = result;
        }
    }
}
