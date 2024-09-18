import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-form-break',
    styleUrls: ['./form-break.component.sass'],
    template: `
        <br class="clearfix"/>
    `
})
export class FormBreakComponent {
    config;
    group: FormGroup;
}
