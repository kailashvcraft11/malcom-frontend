import {Inject, Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Request} from '../request';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService{

    constructor(
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
        private _api: ApiService,
        private _snackBar: MatSnackBar,
    ) {
    }

    isLogged() {
        const logged = this._storage.get('malcolmCurrentUser') ? true : false;
        return logged;
    }

    logIn(emailAddress: string, password: string, callback = null): void {
        const body = {
            email: emailAddress,
            password: password
        };

        this._api.loginUser(body).subscribe((data: any) => {

            // Run a given function
            callback(data);

            // Upon success, update local
            if (data.success) {
                this._updateLocalStorage(data.result);
            }
        });
    }

    logOut() {
        this._storage.remove('malcolmCurrentUser');
    }

    resetPassword(emailAddress: string, callback = null): void {
        this._api.resetPassword(emailAddress)
            .subscribe((data: Request) => {
                this._snackBar.open('We have sent your reset email');
                callback();
            });
    }

    private _updateLocalStorage(data: object) {
        this._storage.set('malcolmCurrentUser', JSON.stringify(data));
    }
}
