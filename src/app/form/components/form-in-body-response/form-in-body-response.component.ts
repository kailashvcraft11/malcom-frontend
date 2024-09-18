import {Component, OnDestroy, OnInit, HostBinding} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ResponsesService} from '../../../services/responses.service';
import {Subscription} from 'rxjs';
import {InBodyService} from '../../../services/inbody.service';

@Component({
    selector: 'app-form-in-body-response',
    template: `
        <span>
            <strong>{{config.label}}</strong>
            {{result}}
            <em *ngIf="config.postfix">{{config.postfix}}</em>
        </span>`,
    styleUrls: ['./form-in-body-response.component.sass']
})
export class FormInBodyResponseComponent implements OnInit, OnDestroy {

    @HostBinding('class.has-label') label = false;
    public config;
    public group: FormGroup;
    public result: any;
    private _responseSubscription: Subscription;

    constructor(
        private _inBody: InBodyService,
        private _responsesService: ResponsesService
    ) {
    }

    ngOnInit() {

        // If a label is provided, set the class
        this.label = this.config.label && this.config.label !== '';

        // Attempt to get this from the service storage
        if (this._inBody.inBodyData) {
            const result = this._inBody.inBodyData;
            if (result[this.config.value]) {
                this.result = result[this.config.value];
                return;
            }
        }

        // If storage is empty, get result from the APi return
        this._inBody.getInBodyData().subscribe(result => {
            this.result = result[this.config.value];
        });

        // this._responseSubscription = this._responsesService
        //     .find(this.config.value)
        //     .subscribe(result => {
        //         if (result !== '') {
        //             this.result = result;
        //         } else {
        //             console.log(result);
        //             this._inBody.updateUserWithInBodyId(function (e) {
        //                 console.log(e);
        //             });
        //         }
        //     });
        //
    }


    ngOnDestroy() {
        // this._responseSubscription.unsubscribe();
    }

}
