import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';

@Component({
    selector: 'app-form-text',
    styleUrls: ['./form-text.component.sass'],
    template: `
        <mat-form-field
                class="dynamic-field form-input"
                [formGroup]="group">
            <span *ngIf="config.prefix" matPrefix>{{config.prefix}}</span>
            <input
                    *ngIf="config.format !== 'date'"
                    matInput
                    [attr.type]="config.format ? config.format : 'text'"
                    [formControlName]="config.name"
                    [placeholder]="config.label"
                    [value]="value"
                    [mask]="mask"
                    [required]="config.required"
                    ngDefaultControl/>
            <span *ngIf="config.format && config.format === 'date'">
                <input
                        matInput
                        [matDatepicker]="picker"
                        [formControlName]="config.name"
                        [placeholder]="config.label"
                        [value]="value"
                        [required]="config.required"
                        ngDefaultControl/>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
            </span>
        </mat-form-field>
    `
})
export class FormTextComponent implements OnInit {

    config;
    group: FormGroup = new FormGroup({});

    // public maxDate = new Date();
    public value: string;
    public mask: string;

    constructor(
        public inputs: InputsService
    ) {
    }

    ngOnInit() {
        let value = this.inputs.getInputByName(this.config.name);

        if (!value) {
            this.inputs.getInputByNameDb(this.config.name).then((data: any) => {
                if (data) {
                    this.value = data.interaction;
                }
            });
        }

        if (value && typeof value === 'object') {
            value = value.label;
        }

        this.value = value ? value : '';

        if (this.config.format !== 'text') {

            const format = this.config.format;

            if (this.config.format === 'number' || this.config.format === 'email') {
                this.config.format = 'text';
            }

            this._selectMaskFormat(format);
        }
    }

    /**
     * Designate mask formats by input type
     * @param format
     * @private
     */
    _selectMaskFormat(format) {
        switch (format) {
            case 'tel':
                this.mask = '(000) 000-0000';
                break;
            case 'email':
                this.mask = 'A*@A*.SSS';
                break;
            case 'number':
                this.mask = '00*.00';
                break;
            case 'date':
                this.mask = 'd0/m0/0000';
                break;
            default:
                this.mask = 'A*';
                break;

        }
    }
}
