import {Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {OnboardingComponent} from '../../../pages/onboarding.component';
import {InputType} from '../../../enums/input-type';
import {InputsService} from '../../../services/inputs.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ApiService} from '../../../services/api.service';

interface Action {
    inputs?: any;
    trigger: string;
}

@Component({
    selector: 'app-form-results',
    template: `
        <section *ngIf="reflection.length">
            <h2>Your Reflection</h2>
            <ul>
                <li *ngFor="let input of reflection">
                    <div>
                        <strong>{{input.label}}</strong>
                        <!--<span *ngIf="input.value">: {{input.value}}</span>-->
                        <!--<span *ngIf="input.range">,-->
                            <!--<strong>Range</strong>: {{ input.range }}-->
                        <!--</span>-->
                    </div>
                    <div *ngIf="input.type && input.type === 'graph_horizontal_bar'" class="result-graph-container">
                        <ng-container appDynamicField [config]="input"></ng-container>
                    </div>
                </li>
            </ul>
        </section>
        <h2 *ngIf="!reflection.length">No reflection created!</h2>
    `,
    styleUrls: ['./form-results.component.sass']
})
export class FormResultsComponent {
    config;
    group: FormGroup = new FormGroup({});

    public reflection: any = [];

    constructor(
        private _onboarding: OnboardingComponent,
        private _inputs: InputsService,
        private _api: ApiService,
        @Inject(LOCAL_STORAGE) private _localStorage: WebStorageService
    ) {
        this._getLatestReflection();
    }

    private _getLatestReflection() {
        // this.reflection = this._interpolateObjectAsReflection(this._onboarding.reflection);

        const inputData = this._localStorage.get('malcolmInputData');
        for (let i = 0; inputData.length > i; i++) {
            if (inputData[i].assignment_id === this._api.flowId) {
                console.log(inputData[i]);
                if (this._isJson(inputData[i].interaction)) {
                    inputData[i].interaction = JSON.parse(inputData[i].interaction);
                }
                this.reflection.push(inputData[i]);
            }
        }
        console.log(this.reflection);
    }

    private _interpolateObjectAsReflection(reflection: any = []) {

        const newReflection = [];

        // Iterate over the object, remove entries with no input or empty data
        for (const page of reflection) {

            // Interpolate given page IDs and get the page content
            const sPage = this._getQuestionFromPageId(page.id);

            // If valid, add the page data to our new reflection
            if (sPage) {

                // Assign the value (label) from the input as a sub-item
                const actions = this._getActionsFromPage(sPage, page);

                // If no inputs are provided, skip the page
                if (!actions || !actions.inputs.length) {
                    continue;
                }

                newReflection.push({
                    'subtitle': sPage.subtitle,
                    'content': sPage.content,
                    'inputs': actions.inputs,
                    'trigger': actions.trigger
                });
            }
        }
        return newReflection;
    }

    /**
     * Get a page by the page ID from the flow
     * @param page_id
     * @returns {any}
     * @private
     */
    private _getQuestionFromPageId(page_id) {

        const flow = this._onboarding.flow;
        const page = flow.filter(result => result.id === page_id)[0];

        if (page) {
            return page;
        }
        return false;
    }

    private _getActionsFromPage(page, reflected) {

        // If inputs are not found then there are likely no inputs on this page
        if (typeof page.node.inputs !== 'undefined' &&
            typeof reflected.data !== 'undefined') {
            const result = {
                'inputs': [],
                'trigger': ''
            };

            // Loop through completed inputs and assign the result
            if (typeof reflected.data.inputs !== 'undefined') {

                const inputs = page.node.inputs;
                const selected = reflected.data.inputs;

                for (const input of inputs) {

                    const name = input.name;

                    if (typeof selected[name] !== 'undefined'
                        || input.type === 'checkbox'
                        || input.type === InputType.GRAPH_HORIZONTAL_BAR) {

                        // If the input is a button with no value, or is set as omitted, then skip it
                        if ((input.type === 'button' && !input.value) || input.omit) {
                            continue;
                        }

                        // If the input type is a checkbox, then we'll need to add the checkbox inputs individually
                        if (input.type === 'checkbox') {
                            const options = input.options;
                            for (const option of options) {
                                if (selected[option.name]) {
                                    result.inputs.push({
                                        'label': option.label,
                                        'name': option.name
                                    });
                                }
                            }
                            continue;
                        }

                        if (input.type === 'range') {
                            if (selected[input.name]) {
                                const values: any[] = JSON.parse(selected[input.name]);

                                values.forEach(value => {
                                    result.inputs.push({
                                        label: 'Your answer',
                                        value: value.name,
                                        range: value.range,
                                    });
                                });

                                continue;
                            }
                        }

                        if (input.type === InputType.GRAPH_HORIZONTAL_BAR) {
                            result.inputs.push(input);

                            continue;
                        }

                        if (typeof selected[name] === 'object') {
                            selected[name] = selected[name].label;
                        }

                        result.inputs.push({
                            'label': input.label,
                            'name': name,
                            'value': selected[name]
                        });
                    }
                }
            }

            // Assign the button selected to the result
            if (typeof reflected.data.trigger !== 'undefined') {
                result.trigger = reflected.data.trigger;
            }

            if (result.inputs.length || result.trigger !== '') {
                return result;
            }
        }
        return false;
    }

    private _isJson(string) {
        try {
            const o = JSON.parse(string);
            if (o && typeof o === 'object') {
                return true;
            }
        } catch (e) {
        }

        return false;
    }
}
