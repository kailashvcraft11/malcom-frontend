import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputsService} from '../../../services/inputs.service';
import {ResponseInterface} from '../../../interfaces/response.interface';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'app-form-comparison',
    styleUrls: ['./form-comparison.component.sass'],
    template: `
        <section *ngIf="config.compared">
            <mat-label *ngIf="config.label">{{config.label}}</mat-label>
            <article *ngFor="let compare of comparison">
                {{compare}}
            </article>
        </section>
    `
})
export class FormComparisonComponent implements OnInit {
    config;
    group: FormGroup;

    public comparison = [];

    constructor(
        private _inputs: InputsService,
        private _api: ApiService
    ) {
    }

    ngOnInit() {
        if (this.config.compared) {
            let interaction: any = 'Unable to find a comparable input.';
            let string = null;
            const formData = new FormData();

            formData.append('reference_id', this.config.compared);
            this._api.postComparedInputByName(formData).subscribe((response: ResponseInterface) => {
                if (response.result[0]) {
                    // Check if the response is JSON.  If it is, then it is a range.  If it is not, then just show it.
                    interaction = response.result[0].interaction;
                    if (this._isJson(interaction)) {
                        interaction = JSON.parse(interaction);
                        for (let i = 0; interaction.length > i; i++) {
                            string = interaction[i].name + ' - ' + (interaction[i].value * 100) + '%';
                            this.comparison.push(string);
                        }
                    }
                }
                if (!string) {
                    this.comparison.push(interaction);
                }
            });
        }
    }

    private _isJson(string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }
}
