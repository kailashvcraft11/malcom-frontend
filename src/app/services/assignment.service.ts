import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class AssignmentService {
    private _assignmentSource = new Subject();
    private _assignment$ = this._assignmentSource.asObservable();

    constructor() {
    }

    getAssignment(): Observable<any> {
        return this._assignment$;
    }

    changeAssignment(assignment: number) {
        this._assignmentSource.next(assignment);
    }
}
