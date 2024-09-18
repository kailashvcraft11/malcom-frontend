import {Inject, Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, of} from 'rxjs';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {delay} from 'rxjs/operators';
import {environment} from '../../environments/environment';

// import {REQUEST} from '../mocks/mock-api';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly _BASE_URL = environment.apiUrl;

    // Universal
    public accountId;
    public accountFlow;
    public accountAssignment;
    public flowId: string;

    constructor(
        private _http: HttpClient,
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService
    ) {
    }

    /**
     * Create a new user by name and email
     *
     * @param body
     * @returns {Observable<ArrayBuffer>}
     */
    public createUser(body) {
        return this._http.post(`${this._BASE_URL}/users`, body);
    }

    /**
     * Log a user in with a given username and password
     *
     * @param body
     * @returns {Observable<Object>}
     */
    public loginUser(body) {
        return this._http.post(`${this._BASE_URL}/authentication`, body);
    }

    /**
     * Reset a user's password by email address
     *
     * @param {string} email_address
     * @returns {Observable<Object>}
     */
    public resetPassword(email_address: string) {
        return this._http.get(`${this._BASE_URL}/users/password/reset/${email_address}`);
    }

    /**
     * Request a flow from the API
     *
     * @returns {Observable<Object>}
     */
    public getFlow() {
        if (!this.flowId) {
            this.flowId = 'default';
        }
        return this._http.get(`${this._BASE_URL}/onboarding/${this.flowId}`);
    }

    /**
     * Simulates an API response
     *
     * @returns {Observable<any>}
     */
    // public getFlowMock(): Observable<any> {
    //     return of(REQUEST[0]).pipe(delay(1000));
    // }

    /**
     * Send a specified number of points to the user
     *
     * @param {string} user_id
     * @param {number} value
     * @returns {Observable<Object>}
     */
    public postPoints(value: number) {
        return this._http.put(`${this._BASE_URL}/points`, {
            unique_id: this._getUserId(),
            assignment_id: this.flowId,
            value: value
        });
    }

    getInBodyResults(userId: string) {
        return this._http.get(`${this._BASE_URL}/inbody/user/${userId}/results/latest`);
    }

    getAllInBodyResults(userId: string) {
        return this._http.get(`${this._BASE_URL}/inbody/user/${userId}/results`);
    }

    getInBodyResponse(userId: string, input: string) {
        return this._http.get(`${this._BASE_URL}/inbody/user/${userId}/response/${input}`);
    }

    updateUserInBodyID(userId: string, data: object) {
        return this._http.put(`${this._BASE_URL}/inbody/user/${userId}/setInBody`, data);
    }

    getUserNotifications(userId: string) {
        return this._http.get(`${this._BASE_URL}/notify/${userId}`);
    }

    getUserPoints(userId: string) {
        return this._http.get(`${this._BASE_URL}/users/${userId}/points`);
    }

    getAssignments() {
        return this._http.get(`${this._BASE_URL}/assignments`);
    }

    getAssignment(assignmentID: string) {
        return this._http.get(`${this._BASE_URL}/assignments/${assignmentID}`);
    }

    getAssignmentsByUser(unique_id: string) {
        return this._http.get(`${this._BASE_URL}/users/${unique_id}/assignments`);
    }

    getCoaches(inputID: number) {
        return this._http.get(`${this._BASE_URL}/admins/coaches/input/${inputID}`);
    }

    getPosts(learningId: any) {

        if (typeof learningId !== 'number') {
            learningId = JSON.stringify(learningId);
        }
        return this._http.get(this._BASE_URL + '/newsfeed/posts/category?category_id=' + learningId);
    }

    sendCoachMessageEmail(data: object) {
        return this._http.post(this._BASE_URL + '/network/coachmessage', data);
    }

    sendIndividualScheduleEmail(data: object) {
        return this._http.post(this._BASE_URL + '/network/schedule/single', data);
    }

    sendGroupScheduleEmail(data: object) {
        return this._http.post(this._BASE_URL + '/network/schedule/group', data);
    }

    postUserInteractions(formData: FormData) {
        formData.append('session_id', this._storage.get('elation-uuid'));
        formData.append('unique_id', this._getUserId()); // User (Unique) ID
        return this._http.post(this._BASE_URL + '/tracking', formData);
    }

    postInputValueByUser(formData: FormData) {
        formData.append('unique_id', this._getUserId()); // User (Unique) ID
        return this._http.post(this._BASE_URL + '/inputs/value', formData);
    }

    postComparedInputByName(formData: FormData) {
        formData.append('unique_id', this._getUserId()); // User (Unique) ID
        return this._http.post(this._BASE_URL + '/inputs/compared', formData);
    }

    postInputTargetBySelection(formData: FormData) {
        formData.append('unique_id', this._getUserId()); // User (Unique) ID
        return this._http.post(this._BASE_URL + '/inputs/targetBySelection', formData);
    }

    /**
     * Get an account by ID
     * @param {string} uniqueId
     * @returns {Observable<ArrayBuffer>}
     */
    getAccount(uniqueId: string) {
        return this._http.get(`${this._BASE_URL}/accounts/${uniqueId}`);
    }

    private _getUserId() {
        const userObject = JSON.parse(this._storage.get('malcolmCurrentUser'));
        if (userObject) {
            return userObject.user.unique_id;
        }
        return null;
    }
}
