import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-form-insights',
    template: `

    `,
    styleUrls: ['./form-insights.component.css']
})
export class FormInsightsComponent {
    config;
    group: FormGroup = new FormGroup({});

    constructor() {
    }
}
