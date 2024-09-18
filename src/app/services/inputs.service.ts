import {Injectable, Inject} from '@angular/core';
import {ApiService} from './api.service';
import {ResponseInterface} from '../interfaces/response.interface';
import {LOCAL_STORAGE, SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';import {FormGroup} from '@angular/forms';
import {Request} from '../request';

@Injectable({
    providedIn: 'root'
})
export class InputsService {

    public inputList = [];
    public inputs = {};
    public comparison = [];

    constructor(
        private _api: ApiService,
        @Inject(LOCAL_STORAGE) private _localStorage: WebStorageService
    ) {
    }

    /**
     * Submit an input to local storage, where it may be retrieved later.  Group must include 'assignment_id', 'reference_id' and 'interaction'.
     * @param {string} name
     * @param value
     */
    setInputs(group) {
        const inputs = this._localStorage.get('malcolmInputData')
            ? this._localStorage.get('malcolmInputData')
            : [];

        // Verify that the input does not already exist.  If it does, then remove the old entry
        for (let i = 0; inputs.length > i; i++) {
            // Insert the assignment ID for reflection
            inputs[i].assignment_id = this._api.flowId;
            for (let c = 0; group.length > c; c++) {
                if (inputs[i] && group[c].reference_id === inputs[i].reference_id) {
                    inputs.splice(i, 1);
                }
            }
        }
        this._localStorage.set('malcolmInputData', inputs.concat(group));
    }

    /**
     * Submit an input to the database.  Group must include 'reference_id' and 'interaction'.
     * @param group
     * @param node_id
     * @returns {Promise}
     */
    setInputsDb(group, node_id) {
        return new Promise(resolve => {
            const formData = new FormData();
            formData.append('onboarding_id', node_id);
            formData.append('group', JSON.stringify(group));
            this._api.postUserInteractions(formData).subscribe((response: ResponseInterface) => {
                if (response.success) {
                    resolve(response);
                }
                if (response.message) {
                    console.warn(response.message);
                }
                resolve(null);
            });
        });
    }

    /**
     * Attempt to retrieve an input by name from local storage
     * @param {string} name
     * @returns {any | number}
     */
    getInputByName(name: string) {
        const inputs = this._localStorage.get('malcolmInputData');
        let value = [];
        if (inputs) {
            value = inputs.filter(function (input) {
                return input.reference_id === name;
            });
        }
        return value[0] ? value[0].interaction : null;
    }

    /**
     * Attempt to retrieve an input by name from the database
     * @param {string} name
     * @returns {Promise}
     */
    getInputByNameDb(name: string) {
        return new Promise(resolve => {
            const formData = new FormData();
            formData.append('reference_id', name);
            this._api.postInputValueByUser(formData).subscribe((response: ResponseInterface) => {
                if (response.success && response.result.length > 0) {
                    resolve({interaction: response.result[0].interaction});
                }
                if (response.message) {
                    console.warn(response.message);
                }
                resolve(null);
            });
        });
    }

    /**
     * Attempt to retrieve values from a comparison input from local storage
     * @param {string} name
     * @returns {any}
     */
    getInputComparisonByName(name: string) {
        const inputs = this._localStorage.get('malcolmInputData')
            ? this._localStorage.get('malcolmInputData')
            : [];

        return inputs.filter(function (input) {
            if (!input.reference_id || !input.interaction) { return; }
            return input.reference_id.includes(name);
        });
    }

    /**
     * Attempt to retrieve values from a comparison input from that database
     * @param {string} name
     * @returns {Promise}
     */
    getInputComparisonByNameDb(name: string) {
        return new Promise(resolve => {
            const formData = new FormData();
            formData.append('reference_id', name);
            this._api.postComparedInputByName(formData).subscribe((response: ResponseInterface) => {
                if (response.success && response.result.length > 0) {
                    resolve(response.result);
                }
                resolve(null);
            });
        });
    }

    // Deprecated
    updateInputs(id: number, inputs: any): void {

        for (const key in inputs) {
            if (inputs.hasOwnProperty(key)) {

                let input = inputs[key];

                // If the input is null, then skip it
                if (typeof input === 'undefined' || input === 'null') {
                    continue;
                }

                if (typeof input === 'object' && input) {
                    input = input.label;
                }

                this.inputs[key] = input;
            }
        }
    }

    /**
     * Get the properties of an input by it's name
     * @param {string} name
     * @returns {any}
     */
    getInputObjectByName(name: string) {

        // If the name includes an option, remove that
        if (name && name.includes('_option_')) {
            name = name.split('_option_')[0];
        }

        const node = this.inputList.filter(function (input) {
            return input.name === name;
        });
        return node[0];
    }

    /**
     * Submit points to the API by user ID
     * @param {number} value
     * @param {string} reference
     */
    submitUserPoints(value: number, reference: string = null): void {
        this._api.postPoints(value).subscribe();
    }

    /**
     * Get an object which is being compared by name
     * @param compared
     * @returns {any[]}
     */
    getComparisonObject(compared: any) {
        const comparison = [];

        if (typeof compared === 'string') {
            const string = compared;
            compared = [string];
        }

        for (const name of compared) {

            // If the input is a checkbox, attempt to return it's child options
            if (name.includes('checkbox_')) {
                for (const value in this.inputs) {
                    if (this.inputs.hasOwnProperty(value)) {
                        console.log(value);
                        if (value.includes(name) && this.getInputByName(value)) {
                            // Get the checkbox object from the checkbox list, and assign the label as the value
                            const checkboxes = this.getInputObjectByName(name).options;
                            const filter = checkboxes.filter(checkbox => value === checkbox.name)[0];
                            comparison.push(filter.label);
                        }
                    }
                }

                // Non-checkbox inputs
            } else {
                const input = this.getInputByName(name);

                if (!input) {
                    comparison.push(name + ' input is not set.  Please fill out this input.');
                } else {
                    // Provision for radio buttons
                    comparison.push(input);
                }
            }
        }
        return comparison;
    }
}
