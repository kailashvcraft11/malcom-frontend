import {Inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ResponseInterface} from '../interfaces/response.interface';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MatSnackBar} from '@angular/material';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InBodyService {

    private _userSubject = new Subject<any>();
    private _inBodySubject = new Subject<any>();

    public userData;
    public inBodyData;

    constructor(
        private _snackBar: MatSnackBar,
        private _api: ApiService,
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
    ) {
        this.userData = JSON.parse(this._storage.get('malcolmCurrentUser')).user;
        console.log(this.userData);

        // Verify that InBody data is available.  If it is not, then get the most recent data from InBody
        if (!this.inBodyData && this.userData.id) {
            this.getAllInBodyResultsByUserId(this.userData.unique_id);
        }
    }

    getInBodyData(): Observable<any> {
            return this._inBodySubject.asObservable();
    }

    getUserData(): Observable<any> {
        return this._userSubject.asObservable();
    }

    getAllInBodyResultsByUserId(userId: string) {
        this._api.getInBodyResults(userId).subscribe((response: ResponseInterface) => {
            if (response.success) {
                const result = response.result;
                this._inBodySubject.next(result);
                this.inBodyData = result;
            } else {
                this._snackBar.open(response.message, '', {
                    duration: 2000
                });
            }
        });
    }

    getRecentInbodyResultsByUserId(userId: string) {
        this._api.getAllInBodyResults(userId).subscribe((response: ResponseInterface) => {
            if (response.success) {
                console.log(response);
            } else {
                this._snackBar.open(response.message, '', {
                    duration: 2000
                });
            }
        });
    }

    /**
     * Add the new InBody ID to the existing User
     * @param userId
     * @param inBodyId
     * @param callback
     * @param {string} message
     */
    updateUserWithInBodyId(inBodyId: string, callback = null): void {

        const user = this.userData;

        this._api.updateUserInBodyID(user.unique_id, {
            inbody_id: inBodyId
        }).subscribe((response: ResponseInterface) => {

            if (response.success) {

                // Add the new InBody ID to the user
                this._updateUserStorage('inbody_id', inBodyId);

                // Run the callback function if provided.
                if (callback) {
                    callback();
                }

            } else {
                this._snackBar.open(response.message, '', {
                    duration: 2000
                });
            }
        });
    }

    private _updateUserWithInBodyResponse() {

    }

    private _updateUserStorage(key, value) {

        this._userSubject[key] = value;

        this._storage.set('malcolmCurrentUser', JSON.stringify({
            user: this.userData
        }));
    }
}
