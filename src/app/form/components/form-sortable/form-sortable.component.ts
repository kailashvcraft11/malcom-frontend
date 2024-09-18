import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {InputsService} from '../../../services/inputs.service';
import {ResponseInterface} from '../../../interfaces/response.interface';
import {ApiService} from '../../../services/api.service';
import {OnboardingComponent} from '../../../pages/onboarding.component';

@Component({
    selector: 'app-form-sortable',
    template: `
        <div class="inputs">
            <mat-label>{{label}}</mat-label>
            <ul *ngIf="comparison.length" cdkDropList (cdkDropListDropped)="sortItems($event)">
                <li *ngFor="let compare of comparison;" cdkDrag>
                    <span>
                        <i class="icon icon-sort"></i>
                        {{compare.label}}
                    </span>
                </li>
            </ul>
            <p *ngIf="!comparison.length" class="text-left">No sortable inputs were selected.</p>
        </div>
    `,
    styleUrls: ['./form-sortable.component.sass']
})
export class FormSortableComponent implements OnInit, OnDestroy {

    config;
    group: FormGroup = new FormGroup({});

    public comparison = [];
    public label;

    constructor(
        private _inputs: InputsService,
        private _onboarding: OnboardingComponent
    ) {
    }

    ngOnInit() {

        this.label = this.config.label;


        // Check whether a comparison input is provided
        if (this.config.compared) {

            // Attempt to retrieve the inputs from local storage, if that's not available, try the db
            const compared = this._inputs.getInputComparisonByName(this.config.compared);

            if (compared) {
                this.comparison = compared;
            } else {
                // If the comparison is unavailable through local storage, check the DB
                this._inputs.getInputComparisonByNameDb(this.config.compared).then((response: any) => {
                    if (response) {
                        this.comparison = response;
                        this._attachStaticOptions();

                        // Pre-sort the items on the list
                        this._sortOptionsByInput();
                    }
                });
            }

            // Retrieve given options if no comparison is yet set
            this._attachStaticOptions();

            // Pre-sort the items on the list
            this._sortOptionsByInput();
        }
    }

    sortItems(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.comparison, event.previousIndex, event.currentIndex);
    }

    ngOnDestroy(): void {
        const group = [];

        // Push the results into the input array
        group.push({
            reference_id: this.config.name,
            interaction: JSON.stringify(this.comparison),
        });
        this._inputs.setInputs(group);
        this._inputs.setInputsDb(group, this._onboarding.id);

        // Add input value to the group
        this.group.get(this.config.name).setValue(this.comparison);
    }

    private _attachStaticOptions() {
        if (this.config.options.length > 0) {
            for (const option of this.config.options) {
                this.comparison.push({label: option.label});
            }
        }
    }

    private _sortOptionsByInput() {
        const sortArray = this._inputs.getInputByName(this.config.name);

        if (sortArray) {
            const sort = typeof sortArray === 'object' ? sortArray : JSON.parse(sortArray);
            this.comparison = this._arraySortOrder(sort, this.comparison);
        } else {
            // If sort order is not found, try the database
            this._inputs.getInputByNameDb(this.config.name).then((data: any) => {
                if (data) {
                    this.comparison = this._arraySortOrder(JSON.parse(data.interaction), this.comparison);
                }
            });
        }
    }

    private _arraySortOrder(sortArray, comparisonArray) {

        const result: any = [];

        // Sort the existing inputs
        for (let key = 0; sortArray.length > key; key++) {
            let found = false;
            comparisonArray = comparisonArray.filter(function (item) {
                if (!found && item.label === sortArray[key].label) {
                    result.push(item);
                    found = true;
                    return false;
                } else {
                    return true;
                }
            });
        }

        // If additional inputs exist that do not exist in the new array, add those in
        const remaining = comparisonArray.filter(function(input) {
            return input.label !== result.label;
        });

        return result.concat(remaining);
    }
}
