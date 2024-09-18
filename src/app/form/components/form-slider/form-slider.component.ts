import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';

@Component({
    selector: 'app-form-slider',
    styleUrls: ['./form-slider.component.sass'],
    template: `
        <div class="fieldset-wrapper" fxLayout="column" fxLayoutAlign="center center">
            <mat-label *ngIf="config.label">{{config.label}}</mat-label>
            <div class="slider-wrapper" fxLayout="row" fxLayoutAlign="center center">
                <span fxFlex="25">{{labels[0]}}</span>
                <mat-slider
                        #slider
                        fxFlex="50"
                        (blur)="updateInputGroup(slider.value)"
                        [value]="value"
                        [max]="1"
                        [min]="0"
                        [step]=".01"
                        [tickInterval]="0"
                        thumbLabel="false">
                </mat-slider>
                <span fxFlex="25">{{labels[labels.length - 1]}}</span>
            </div>
            <div *ngIf="max >= 3">
                {{ labels[mid] }}
            </div>
        </div>
    `
})
export class FormSliderComponent implements OnInit {

    config;
    group: FormGroup = new FormGroup({});

    public value: number;
    public options: any;
    public max: number;
    public mid: number;
    public labels: any = [];

    constructor(
        public inputs: InputsService
    ) {
    }

    ngOnInit() {

        // Check whether a value was previously set
        const value = this.inputs.getInputByName(this.config.name);
        if (value) {
            this.value = value;
        }

        // Set the options
        this.options = this.config.options;

        // Add the labels to the array
        for (const option of this.options) {
            this.labels.push(option.label);
        }
        this.max = this.labels.length;

        // Get the middle value
        this.mid = Math.round((this.labels.length - 1) / 2);
    }

    updateInputGroup(value) {
        const key = this.config.name;
        this.inputs.updateInputs(null, {
            [key]: '' + value
        });
    }
}
