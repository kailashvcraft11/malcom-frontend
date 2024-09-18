import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DynamicFormComponent} from '../../containers/dynamic-form/dynamic-form.component';
import {InputsService} from '../../../services/inputs.service';

@Component({
    selector: 'app-form-textarea',
    styleUrls: ['form-textarea.component.sass'],
    template: `
        <mat-form-field
                [ngClass]="config.attributes && config.attributes.class ? config.attributes.class : false"
                class="dynamic-field form-select"
                [formGroup]="group">
            <textarea
                    matInput
                    #input
                    [formControlName]="config.name"
                    [placeholder]="config.label"
                    [attr.maxlength]="config.limit"
                    [value]="value"
            >{{value}}</textarea>
            <mat-hint *ngIf="config.limit" align="end">{{input.value?.length || 0}}/{{config.limit}}</mat-hint>
        </mat-form-field>
    `,
})
export class FormTextareaComponent implements OnInit {
    config;
    group: FormGroup;

    public value: string;

    constructor(
        public inputs: InputsService
    ) {
    }

    ngOnInit() {
        const value = this.inputs.getInputByName(this.config.name);
        this.value = value ? value : '';
    }
}
