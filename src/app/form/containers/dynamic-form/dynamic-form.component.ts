import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

import {NavigationService} from '../../../services/navigation.service';
import {InputsService} from '../../../services/inputs.service';
import {OnboardingComponent} from '../../../pages/onboarding.component';
import {ApiService} from '../../../services/api.service';
import {Request} from '../../../request';

@Component({
    selector: 'app-dynamic-form',
    styleUrls: ['dynamic-form.component.sass'],
    template: `
        <form
                *ngIf="form"
                class="dynamic-form"
                [formGroup]="form"
                (ngSubmit)="submitted.emit(form.value)">
            <ng-container
                    *ngFor="let field of config;"
                    appDynamicField
                    [config]="field"
                    [group]="form">
            </ng-container>
        </form>
    `
})
export class DynamicFormComponent implements OnInit {

    @Input()
    config: any[] = [];

    @Output()
    submitted: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _api: ApiService,
        private _inputs: InputsService,
        public navigation: NavigationService,
        public onboarding: OnboardingComponent
    ) {
    }

    ngOnInit() {
        this.createGroup();
    }

    /**
     * Updates reflect with any input values given
     *
     * @param {string} name
     */
    updateReflectionInputs(name: string = ''): void {

        const form = this.form.value;
        const inputs: object = {
            'trigger': name
        };

        // Add the page information to group data
        const group = [{
            reference_id: name, // button trigger ID
            interaction: Date.now() - this.onboarding.duration, // duration
            label: '',
            type: ''
        }];

        // Iterate through input values
        for (const ref in form) {

            // Filter out empty input values
            if (ref !== '' && form.hasOwnProperty(ref)) {

                // Remove any empty entries
                if (typeof form[ref] === 'undefined' || form[ref] === null) {
                    delete form[ref];
                    continue;
                }

                // if (ref && form[ref]) {
                const interaction =  typeof form[ref].label !== 'undefined'
                    ? form[ref].label
                    : form[ref];

                // Get input data
                const input = this._inputs.getInputObjectByName(ref);

                if (!input.omit) {
                    // Add value to the group
                    group.push({
                        reference_id: ref, // input name, filename, or page
                        interaction: interaction, // value or duration
                        label: input.label, // input label if applicable
                        type: input.type // input type if applicable
                    });
                }

                // Add the inputs to the input object for easy reference
                // this._inputs.updateInputs(this.onboarding.page.id, form);

                // Assign any given point values
                this._assignPointsByInputs(form);
            }
        }

        // Save the group to local storage for later reference
        this._inputs.setInputs(group);

        // Save the group to the database
        this._inputs.setInputsDb(group, this.onboarding.id).then((data: any) => {

            // When the button is clicked, update reflection data
            // TODO: this can likely be just need to be the page id, rather than everything
            this.navigation.updateReflection(this.onboarding.page.id, inputs);

            // Clear the form after submission to prevent duplicate submissions
            this.form.reset();
        });
    }

    /**
     * Creates input groups to ensure that input data is recorded
     */
    createGroup(): void {

        this._api.getFlow()
            .subscribe((data: Request) => {

                    // Add config for each group in form
                    const config = this._retrieveAllInputs(data.result.nodes);
                    const group = this._fb.group({});
                    config.forEach((control) => {

                        // If undefined, continue iterating
                        if (
                            typeof control.name === 'undefined' &&
                            typeof control.options === 'undefined') {
                            return;
                        }

                        // If name is defined, the add that control to the group
                        if (typeof control.name !== 'undefined') {
                            group.addControl(control.name, this._fb.control(null));
                        }

                        // If the control group has options, then iterate through those instead
                        if (typeof control.options !== 'undefined') {
                            for (const option in control.options) {
                                if (control.options.hasOwnProperty(option)) {
                                    const subControl = control.options[option];
                                    if (typeof subControl.name !== 'undefined') {
                                        group.addControl(subControl.name, this._fb.control(null));
                                    }
                                }
                            }
                        }

                    });
                    this.form = group;
                }
            );
    }

    /**
     * Get all inputs from the current flow.  Add those to the form group system.
     *
     * @returns {any[]}
     * @private
     */
    private _retrieveAllInputs(flow) {
        const result = [];

        // Find all pages in the flow
        for (const page in flow) {
            if (flow.hasOwnProperty(page)) {
                const p = flow[page].node;
                if (typeof p.inputs !== 'undefined') {

                    // Get all inputs from each individual page, and assign them
                    for (const input in p.inputs) {
                        if (p.inputs.hasOwnProperty(input)) {
                            result.push(p.inputs[input]);
                        }
                    }
                }
            }
        }
        return result;
    }

    /**
     * Assign points based on the inputs which were filled/selected
     *
     * @param inputs
     * @private
     */
    private _assignPointsByInputs(inputs): void {

        let value = 0;

        // Loop through filled inputs
        for (const name in inputs) {

            if (!inputs.hasOwnProperty(name)) {
                continue;
            }

            // When an input is found, add that point value
            const input = this.config.find(x => x.name === name);

            // If the input is not found, the skip this
            if (typeof input === 'undefined') {
                continue;
            }

            if (input.points) {
                value += input.points;
            }
        }

        // Take the total points and submit them to the API
        if (value) {
            this._inputs.submitUserPoints(value);
        }
    }
}
