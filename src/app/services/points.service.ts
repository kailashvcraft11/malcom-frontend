import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class PointsService {
    private _pointsSource = new Subject();
    private _points$ = this._pointsSource.asObservable();

    constructor() {
    }

    showPoints(): Observable<any> {
        return this._points$;
    }

    togglePoints(show: boolean) {
        this._pointsSource.next(show);
    }
}
