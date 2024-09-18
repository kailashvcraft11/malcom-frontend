import {AfterViewInit, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {OnboardingComponent} from '../../../pages/onboarding.component';
import {DynamicFormComponent} from '../../containers/dynamic-form/dynamic-form.component';
import {NavigationService} from '../../../services/navigation.service';
import {InputsService} from '../../../services/inputs.service';
import {AssignmentService} from '../../../services/assignment.service';
import {ApiService} from '../../../services/api.service';
import {Request} from '../../../request';
import {ResponseInterface} from '../../../interfaces/response.interface';

@Component({
    selector: 'app-form-button',
    styleUrls: ['form-button.component.sass'],
    template: `
        <span
                class="dynamic-field form-button"
                [formGroup]="group">
            <button
                    mat-raised-button
                    type="submit"
                    *ngIf="!config.timein"
                    [formControlName]="config.name"
                    (click)="formSubmit()"
                    ngDefaultControl>
                {{config.label}}
            </button>
        </span>
    `,
})
export class FormButtonComponent implements AfterViewInit {
    config;
    group: FormGroup;

    constructor(
        private _onboarding: OnboardingComponent,
        private _inputs: InputsService,
        private _router: Router,
        private _api: ApiService,
        private _navigation: NavigationService,
        public form: DynamicFormComponent,
    ) {
    }

    ngAfterViewInit() {
        this._resizeButtonInputWidths();
        this._resizeRadioButtonWidths();
    }

    /**
     * Get the target from the button input, or linked input, and refresh the page
     */
    formSubmit(): void {

        // Verify that all required inputs have been filled
        if (!this._requiredInputsAllFilled()) {
            return;
        }

        let target = this.config.target;

        if (/^\d+$/.test(target)) {
            target = Number(target);
        }

        // The target may be an audio file.  In that case, run the file rather than resetting the target
        if (typeof target === 'string' && target.includes('.mp3')) {
            this._onboarding.loadMediaFile(target);
            return;
        }

        // Take any inputs and update the current reflection
        this.form.updateReflectionInputs(this.config.name);

        // If the target is a string, then it is likely the name of another input.  Get that input by name use that target
        if (typeof target !== 'number') {

            const targetValue = this._inputs.getInputByName(target);
            const targetInput = this._inputs.getInputObjectByName(target);

            // If there's no target value returned, quit there
            if (typeof targetValue === 'undefined') {
                target = this._onboarding.id;
            } else {

                let targetFound = null;

                // Filter the radio options by label
                if (targetInput) {
                    targetFound = targetInput.options.filter(function (input) {
                        if (input.label === targetValue) {
                            return input;
                        }
                    })[0];
                }

                // If a target is found, then assign it
                if (targetFound) {
                    target = targetFound.target;
                }
            }
        }

        // Redirect to the targeted page
        // If the compared assignment ID is set or the target type is a radio input, then we are redirecting to a different flow
        if (this.config.compared_assignment_id && (!this.config.target || !this.config.target.includes('radio'))) {

            const assignmentId = this.config.compared_assignment_id;

            if (assignmentId === 'dashboard') {
                this._router.navigate(['/dashboard']);
                return;
            }

            // If the target is numeric, it is a page, so redirect to that
            if (!isNaN(target)) {
                window.location.href = `/onboarding/${this._api.accountId}/${assignmentId}/${target}`;
            } else {

                // Retrieve the value of the input given.  This is taken from the database.
                const formData = new FormData();
                formData.append('reference_id', target);
                formData.append('assignment_id', assignmentId);

                // Retrieve the new window location
                this._api.postInputTargetBySelection(formData).subscribe((response: ResponseInterface) => {
                    if (response.success && response.count > 0) {
                        const res = response.result;
                        window.location.href = `/onboarding/${this._api.accountId}/${res.assignment}/${res.page}`;
                    }
                });
            }
        } else {
            // Update the reflection with the new target page
            this._navigation.updateFlowPage(target);
        }
    }

    /**
     * Normalize button widths using the width of the largest button
     *
     * @private
     */
    private _resizeButtonInputWidths(): void {
        const selectors = 'button:not([ng-reflect-name=submit]):not(.mat-icon-button):not(.mat-button-toggle-button):not(.width-auto)';
        const buttons = this._determineMaxWidthBySelector(selectors);

        // Apply max width to all inputs
        for (let i = 0; i < buttons.elements.length; i++) {
            buttons.elements[i].setAttribute('style', 'min-width: ' + buttons.width + 'px');
        }
    }

    /**
     * Resize radio-style buttons by the widest button
     *
     * @private
     */
    private _resizeRadioButtonWidths(): void {
        const labels = this._determineMaxWidthBySelector('.mat-radio-label, .mat-checkbox-layout, .mat-form-field');
        const inputs = document.querySelectorAll('.mat-radio-button, .mat-checkbox');

        // Apply max width to all inputs
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('style', 'width: ' + labels.width + 'px');
        }
    }

    /**
     * Get the max width of a given selector
     *
     * @param {string} selector
     * @returns {{elements: NodeListOf<Element>; width: number}}
     * @private
     */
    private _determineMaxWidthBySelector(selector: string) {
        const input = document.querySelectorAll(selector);
        let width = 0;

        if (input.length) {
            // Determine the max length
            for (let i = 0; i < input.length; i++) {
                const clientWidth = input[i].clientWidth;
                width = clientWidth > width ? clientWidth : width;
            }
        }
        return {
            'elements': input,
            'width': width
        };
    }

    /**
     * Iterate through each input, and prevent empty required inputs from progressing the flow
     * @returns {boolean}
     * @private
     */
    private _requiredInputsAllFilled() {
        const required = document.querySelectorAll('[required]');
        const status = [];
        let valid = true;

        for (let i = 0; i < required.length; i++) {

            const element = (required[i] as HTMLInputElement);
            const name = element.getAttribute('ng-reflect-name');

            if (name) {
                // If there are child nodes, this is likely a radio group.  Iterate through the group and see if a member is checked
                if (element.childNodes.length) {

                    valid = false;
                    const children = document.querySelectorAll(`[ng-reflect-name=${name}] .mat-radio-input`);

                    for (let c = 0; c < children.length; c++) {

                        const child = (children[c] as HTMLInputElement);
                        if (child.checked) {
                            valid = true;
                        }
                    }
                } else {

                    // Proceed as an input with a regular value
                    const value = element.value;
                    if (!value || value === '') {
                        valid = false;
                    }
                }
                if (!valid) {
                    this.group.controls[name].markAsTouched();
                }
            }
            status.push(valid);
        }
        return !status.includes(false);
    }
}
