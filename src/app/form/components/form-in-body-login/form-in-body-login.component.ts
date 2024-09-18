import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ResponseInterface} from '../../../interfaces/response.interface';
import {MatSnackBar} from '@angular/material';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NavigationService} from '../../../services/navigation.service';
import {InputsService} from '../../../services/inputs.service';
import {InBodyService} from '../../../services/inbody.service';

@Component({
    selector: 'app-form-in-body-login',
    template: `
        <form>
            <h2 mat-dialog-title>
                Review your analysis
                <small>Enter your InBody ID to get started.</small>
            </h2>
            <div>
                <mat-form-field>
                    <input type="text"
                           matInput
                           [(ngModel)]="inBodyId"
                           name="inBodyId"
                           placeholder="InBody ID">
                </mat-form-field>
            </div>
            <button mat-raised-button color="accent" (click)="update()">Continue</button>
        </form>`,
    styleUrls: ['./form-in-body-login.component.sass']
})
export class FormInBodyLoginComponent implements OnInit {

    public config: any;
    public inBodyId: string;

    private _user: any;

    constructor(
        private _api: ApiService,
        private _snackBar: MatSnackBar,
        private _navigation: NavigationService,
        private _inBody: InBodyService,
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService
    ) {
    }

    ngOnInit() {
        let user = this._storage.get('malcolmCurrentUser');
        if (user) {
            user = JSON.parse(user);
            this._user = user.user;
            this.inBodyId = user.user.inbody_id;
            if (this._user && this.inBodyId) {
                this._navigation.updateFlowPage(this.config.target);
            }
        }
    }


    update() {
        const $this = this;
        this._inBody.updateUserWithInBodyId(this.inBodyId, function () {
            $this._navigation.updateFlowPage($this.config.target);
        });
    }
}
