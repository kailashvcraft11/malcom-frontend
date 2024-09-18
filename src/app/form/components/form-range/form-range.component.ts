import {Component, ViewContainerRef, ViewChild, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';

@Component({
    selector: 'app-form-range',
    template: `
        <div class="fieldset-wrapper">
            <fieldset *ngFor="let row of rows; let i = index">
                <mat-form-field
                        [formGroup]="group"
                        class="dynamic-field form-input">
                    <input
                            #nameInput
                            (blur)="updateInputObject(i, nameInput.value)"
                            matInput
                            type="text"
                            [value]="rows[i].name"
                            [placeholder]="config.label ? config.label : placeholder"
                            ngDefaultControl/>
                </mat-form-field>
                <mat-slider
                        #sliderInput
                        (blur)="updateInputObject(i, sliderInput.value)"
                        [max]="1"
                        [min]="0"
                        [step]=".01"
                        [tickInterval]="0"
                        [value]="rows[i].value"
                        thumbLabel="false">
                </mat-slider>
                <i (click)="removeRow(i)" class="icon-remove">Remove</i>
            </fieldset>
            <div #clone></div>
            <i (click)="addNewRow()" class="icon-add">Add New</i>
        </div>
    `,
    styleUrls: ['./form-range.component.sass']
})
export class FormRangeComponent implements OnInit {

    config;
    group: FormGroup = new FormGroup({});

    public placeholder = 'Enter a value';
    public rows = [{
        name: '',
        value: ''
    }];

    constructor(
        private _inputs: InputsService
    ) {
    }

    ngOnInit() {
        const value = this._inputs.getInputByName(this.config.name);

        if (value) {
            const json = value.label ? value.label : value;
            this.rows = JSON.parse(json);
        }
    }

    /**
     * Add a new value row
     */
    addNewRow() {
        this.rows.push({
            name: '',
            value: ''
        });
    }

    /**
     * Remove a range row
     * @param {number} index
     */
    removeRow(index: number) {
        this.rows.splice(index, 1);

        this._updateFormControl();
    }

    /**
     * Add the input to the form control
     * @param {number} index
     * @param value
     */
    updateInputObject(index: number, value: any): void {

        const key = typeof value !== 'number'
            ? 'name'
            : 'value';

        if (this.rows[index][key] === value) {
            return;
        }

        this.rows[index][key] = key !== 'name'
            ? value.toString()
            : value;

        this._updateFormControl();
    }

    private _updateFormControl() {
        const control = {};
        control[this.config.name] = JSON.stringify(this.rows);

        // Update the form control
        this.group.patchValue(control);
    }
}
