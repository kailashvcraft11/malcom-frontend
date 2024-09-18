import {Component, OnInit, isDevMode} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

import {NavigationService} from '../../../services/navigation.service';
import {DynamicFormComponent} from '../../containers/dynamic-form/dynamic-form.component';
import {ApiService} from '../../../services/api.service';

import {environment} from '../../../../environments/environment';

interface ResponseInterface {
    message: string;
    result: any;
    success: boolean;
}

@Component({
    selector: 'app-form-dashboard',
    template: `
        <section>

            <h1>{{config.label}}</h1>
            <h2>Select a category to begin your coaching session</h2>

            <div *ngIf="assignments" fxLayout="row" fxLayout.xs='column' fxLayoutAlign="space-around center" id="categories">
                <article *ngFor="let option of assignments">
                    <div [style.borderColor]="option.color" [class.recommended]="option.recommended" routerLink="/onboarding/{{option.id}}"
                         class="circle">
                        <i
                                class="icon"
                                [style.mask]="option.iconPath ? option.iconPath : iconDefault"
                                [style.webkitMask]="option.iconPath ? option.iconPath : iconDefault"
                                [style.backgroundColor]="option.color"></i>
                    </div>
                    {{option.title}}
                </article>
            </div>

            <div
                    fxLayout="row"
                    fxLayout.xs='column'
                    fxLayoutAlign="space-around start"
                    fxLayoutAlign.xs="space-around center"
                    fxFlexOrder.xs="1"
                    id="feed">
                <article *ngIf="config.options.includes('exercise-network')" [fxFlex]="columnWidth">
                    <h3>Exercise Network</h3>
                    <article>
                        <div style="color: rgb(128, 195, 32)" class="circle">
                            <i class="icon icon-trainingPartners"></i>
                        </div>
                        My Training Partners
                    </article>
                </article>

                <article *ngIf="config.options.includes('upcoming')" fxFlex fxFlexOrder.xs="3" id="upcomingEvents">
                    <h3>Upcoming Events</h3>
                    <ul *ngIf="learning.length">
                        <li *ngFor="let post of learning">
                            <h4 [style.color]="post.color ? post.color : ''">{{post.title}}</h4>
                            {{convertUnixToDateTime(post.publish_at)}}<br>
                            {{post.location ? post.location : ''}}
                        </li>
                    </ul>
                    <span *ngIf="!learning.length">No events found.</span>
                </article>

                <article *ngIf="config.options.includes('tools')" [fxFlex]="columnWidth" fxFlexOrder.xs="2">
                    <h3>Tools</h3>
                    <div fxLayout.xs='column'>
                        <article fxFlex="50">
                            <article>
                                <div style="color: rgb(121, 43, 137)" class="circle">
                                    <i class="icon icon-inbody"></i>
                                </div>
                                InBody Scan<br><span class="uppercase">Results</span>
                            </article>
                        </article>
                        <article fxFlex="50">
                            <article>
                                <div style="color: rgb(121, 43, 137)" class="circle">
                                    <i class="icon icon-fourcore"></i>
                                </div>
                                FourCore<br><span class="uppercase">Diagnosic</span>
                            </article>
                        </article>
                    </div>
                </article>
            </div>

        </section>
    `,
    styleUrls: ['./form-dashboard.component.sass']
})
export class FormDashboardComponent implements OnInit {
    config;
    group: FormGroup;

    public assignments = [];
    public learning = [];
    public iconDefault = this._sanitizer.bypassSecurityTrustStyle(
        'url(https://s3-us-west-2.amazonaws.com/elation-asset-bucket/images/fourcore.svg)'
    );
    public columnWidth = 33;
    private _BASE_URL = environment.baseUrl;

    constructor(
        private _sanitizer: DomSanitizer,
        private _api: ApiService,
        public form: DynamicFormComponent
    ) {
    }

    ngOnInit() {
        this._getAssignmentByInput();
        this.columnWidth = this.config.options.length >= 3 ? 33 : 50;

        if (this.config.options.includes('tools')) {
            this._getLearningByCategoryId(this.config.attributes);
        }
    }

    convertUnixToDateTime(timestamp) {
        const a = new Date(timestamp),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            year = a.getFullYear(),
            month = months[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes(),
            time = date + ' ' + month + ' ' + year + ' @ ' + hour + ':' + (min < 10 ? '0' + min : min);

        return time;
    }

    private _getAssignmentByInput() {
        const values = JSON.parse(this.config.value);
        this._api.getAssignments().subscribe((response: ResponseInterface) => {
            const assignments = response.result;
            for (const k in assignments) {
                if (assignments.hasOwnProperty(k) && values.includes(assignments[k].id)) {
                    // Sanitize images
                    if (assignments[k].iconPath) {
                        assignments[k].iconPath = this._sanitizer.bypassSecurityTrustStyle(`url(${assignments[k].iconPath})`);
                    }
                    // Push into the assignments array
                    this.assignments.push(assignments[k]);
                }
            }
        });
    }

    private _getLearningByCategoryId(categories: any) {
        this._api.getPosts(categories).subscribe((response: ResponseInterface) => {
            if (response.success) {
                this.learning = response.result;
                console.log(this.learning);
            }
        });
    }
}
