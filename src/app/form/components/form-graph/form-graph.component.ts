import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';

@Component({
    selector: 'app-form-graph',
    template: `
        <div *ngIf="results.length" class="form-graph-bar-chart">
            <ngx-charts-bar-horizontal-2d
                    [results]="results"
                    [yAxis]="true"
                    [showYAxisLabel]="true"
                    [view]="[null,200]"
                    [roundEdges]="false"
                    [showGridLines]="true"
                    [customColors]="colors">
            </ngx-charts-bar-horizontal-2d>
        </div>
        <span *ngIf="!results.length">
            <p>No graphs available, please fill out all required inputs.</p>
        </span>
    `,
    styleUrls: ['./form-graph.component.sass']
})
export class FormGraphComponent implements OnInit, AfterContentInit, OnDestroy {
    config;
    group: FormGroup = new FormGroup({});

    public comparison = '';
    public results = [];
    public series = [];
    public colors = [];

    public pileLength;
    public chartHeight;
    public graphHeight;

    constructor(
        public _inputs: InputsService
    ) {
    }

    ngOnInit() {

        // TODO: temp hack to put a single item in an array.  Previously this function supported multi-selects
        // const compared = JSON.parse(JSON.stringify([this.config.compared]));
        const compared = JSON.parse(this.config.compared);

        for (let i = 0; compared.length > i; i++) {
            let ranges = null;
            let object = null;
            let name;
            const comparison = this._inputs.getComparisonObject(compared[i])[0];
            const input = this._inputs.getInputObjectByName(compared[i]);
            const palette = ['#8DC63F', '#16BECF'];

            // Check if the comparison is a range with valid JSON
            if (input.type === 'range' && this._isJson(comparison)) {
                object = JSON.parse(comparison);

                // If the object includes multiple inputs, then use the overall input label
                name = object.length > 1
                    ? input.label
                    : object[0].name;
            } else if (input.type !== 'range') {

                // If the input returns as not set, then skip it.
                if (comparison.includes('not set')) {
                    continue;
                }

                name = input.label;
                object = [{
                    name: input.label,
                    value: Number(comparison)
                }];
            }

            // Create a range
            if (object) {
                ranges = {
                    name: name,
                    series: this._cleanObject(object)
                };
                this.colors.push({
                    name: name,
                    value: palette[(i % 2 === 0 ? 0 : 1)]
                });
            }

            // Add ranges to the results if the range is not empty
            if (ranges && ranges.name) {
                this.results.push(ranges);
            }
        }
    }

    ngAfterContentInit() {

        // let i = 0;
        const palette = ['#8DC63F', '#16BECF'];
        // const data = [{
        //     name: this.config.label || '',
        //     series: []
        // }];

        // Add compared inputs to the final result
        // for (const input of this._inputs.comparison) {
        //     data[0].series.push({
        //         name: input.name,
        //         value: input.value
        //     });

        // Build the custom colors
        // this.customColors.push({
        //     name: input.name,
        //     value: palette[(i % 2 === 0 ? 0 : 1)]
        // });
        //     i++;
        // }
        // this.results = data;
        // this.series = data[0].series;
        // // TODO: Testing only
        // this.results = [
        //     {
        //         name: 'Graph Test',
        //         series: [
        //             {name: 'Test Number', value: 2},
        //             {name: 'Another test number', value: -5},
        //             {name: 'Final test', value: 8}
        //         ]
        //     }
        // ];
        // this.series = [{}, {}];
        // console.log(this.customColors);
    }

    ngOnDestroy() {

        // Clear the comparisons
        this._inputs.comparison = [];
    }

    private _cleanObject(object) {
        for (const obj of object) {
            obj.value = Number(obj.value);
        }
        return object;
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
