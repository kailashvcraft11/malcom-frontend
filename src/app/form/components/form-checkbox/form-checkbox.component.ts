import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
    selector: 'app-form-checkbox',
    styleUrls: ['./form-checkbox.component.sass'],
    template: `
        <div
                class="dynamic-field form-checkbox"
                [formGroup]="group">
            <mat-label *ngIf="config.label">{{config.label}}</mat-label>
            <mat-checkbox
                    *ngFor="let option of config.options"
                    [formControlName]="option.name"
                    [checked]="option.value"
                    ngDefaultControl
                    (change)="changeValue($event, option.name)">
                {{option.label}}
            </mat-checkbox>
        </div>
    `
})
export class FormCheckboxComponent implements OnInit, OnDestroy {
    config;
    group: FormGroup;

    public value: any;
    private values = {};

    constructor(
        private _inputs: InputsService
    ) {
    }

    ngOnInit() {
        // Check whether inputs have been selected, and if so assign the values
        for (const option of this.config.options) {
            const input = this._inputs.getInputByName(option.name);

            if (input) {
                this.group.get(option.name).setValue(true);
                this.values[option.name] = true;
            } else {
                this.values[option.name] = false;
            }
        }
    }

    changeValue(value: MatCheckboxChange, option: string) {
        this.group.get(option).setValue(value.checked);
        this.values[option] = value.checked;
    }

    ngOnDestroy(): void {

        // Collect all checkbox values and submit them to the DB
        const inputs = [];
        for (const value in this.values) {
            if (this.values.hasOwnProperty(value)) {

                // Get the label
                const label = this.config.options.filter(function (input) {
                    return input.name === value;
                })[0].label;

                // Push the results into the input array
                inputs.push({
                    reference_id: value,
                    interaction: this.values[value],
                    label: label
                });
            }
        }
        this._inputs.setInputs(inputs);
    }
}
