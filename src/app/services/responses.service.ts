import {Inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {LOCAL_STORAGE, SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';import {ResponseInterface} from '../interfaces/response.interface';
import {Observable, of, Subject} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable()
export class ResponsesService {
    private _responses: object;
    private _isLoading = false;
    private _waiting: { response: string, subject: Subject<any> }[];
    private _responsesSource = new Subject();
    private _responses$ = this._responsesSource.asObservable();
    private _user: any;

    constructor(
        private _api: ApiService,
        @Inject(SESSION_STORAGE) private _storage: WebStorageService,
        @Inject(LOCAL_STORAGE) private _localStorage: WebStorageService
    ) {
        this._waiting = [];
        const responses = this._storage.get('responses');
        this._user = JSON.parse(this._localStorage.get('malcolmCurrentUser'));

        if (responses) {
            this._responses = JSON.parse(responses);
        } else {
            this._getResponses();
        }
    }

    find(response: string): Observable<any> {
        const subject = new Subject();

        if (!this._responses && !this._isLoading) {
            this._waiting.push({
                response,
                subject
            });
            this._getResponses();

            return subject.asObservable();
        } else if (!this._responses) {
            this._waiting.push({
                response,
                subject
            });

            return subject.asObservable();
        }

        for (const prop in this._responses) {
            if (this._responses.hasOwnProperty(prop) && prop === response) {
                return of(this._responses[prop]);
            }
        }

        return of('');
    }

    all(): Observable<any> {
        if (!this._responses && !this._isLoading) {
            const subject = new Subject();

            this._waiting.push({
                response: '',
                subject
            });

            return this._responses$;
        }

        return of(this._responses);
    }

    private _getResponses() {
        this._isLoading = true;

        this._api.getInBodyResults(this._user.user.unique_id).subscribe((response: ResponseInterface) => {
            if (response.success) {
                this._storage.set('responses', JSON.stringify(response.result));
                this._responses = response.result;

                this._responsesSource.next(response.result);

                if (this._waiting.length) {
                    for (let i = 0; i < this._waiting.length; i++) {
                        this.find(this._waiting[i].response).pipe(first()).subscribe(result => {
                            this._waiting[i].subject.next(result);
                        });
                    }

                    this._waiting = [];
                }
            }
        });
    }
}
