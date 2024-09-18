import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';
import {MatRadioChange} from '@angular/material';

@Component({
    selector: 'app-form-radio',
    styleUrls: ['./form-radio.component.sass'],
    template: `
        <div
                class="dynamic-field form-radio"
                [formGroup]="group">
            <mat-label *ngIf="config.label">{{config.label}}</mat-label>
            <mat-radio-group
                    [formControlName]="config.name"
                    [required]="config.required">
                <mat-radio-button
                        *ngFor="let option of config.options"
                        [value]="option"
                        [checked]="value === option.label ? 'checked' : false"
                        (change)="changeValue($event, option.name)">
                    {{option.label}}
                </mat-radio-button>
            </mat-radio-group>
        </div>
    `
})
export class FormRadioComponent implements OnInit, OnDestroy {
    config;
    group: FormGroup;

    public value: any;

    constructor(
        public inputs: InputsService
    ) {
    }

    ngOnInit() {
        const value = this.inputs.getInputByName(this.config.name);
        this.value = value ? value : false;
    }

    changeValue(event: MatRadioChange, option: string) {
        this.group.get(option).setValue(event.value);
    }

    ngOnDestroy(): void {
        this.inputs.updateInputs(this.config.id, this.value);
    }
}
