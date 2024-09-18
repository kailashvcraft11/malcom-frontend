import {Inject, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, Subject} from 'rxjs';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';import {InputsService} from './inputs.service';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private _flow = [];
    private _page = [];
    private _reflection = [];
    private _reference: number = null;

    public path = [];
    // public flow$ = new Subject();
    public page$ = new Subject();
    public reflection$ = new Subject();
    public media$ = new Subject();
    public theme$ = new Subject();

    // Storage variables
    public flowId: string;

    constructor(
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService,
        private _location: Location,
        private _inputs: InputsService,
        private _api: ApiService
    ) {
    }

    // getFlowSource(): Observable<any> {
    //     return this.flow$;
    // }

    getFlowPage(): Observable<any> {
        return this.page$;
    }

    getReflection(): Observable<any> {
        return this.reflection$;
    }

    getMediaFile(): Observable<any> {
        return this.media$;
    }

    getTheme(): Observable<any> {
        return this.theme$;
    }

    updateInitReflection() {
        if (!this._storage.get('malcolmReflectionData')) {
            return false;
        }
        let data = this._storage.get('malcolmReflectionData');

        if (typeof data !== 'undefined') {
            const flowId = !this.flowId ? 'default' : this.flowId;

            if (!data[flowId]) {
                return false;
            }
            data = data[flowId];

            this._reflection = data;

            // Specify the ID of the proper page
            return data[data.length - 1].id;
        }
        return false;
    }

    updateFlowSource(flow, id: number = 1): void {
        this._flow = flow;

        // Update the flow observable
        this.page$.next(this._flow);

        // With the new flow, re-assign the default page
        this.updateFlowPage(id);

        // Add the inputs to the input list for reference
        this._updateInputList(flow);
    }

    updateFlowPage(id: any = null, updateFlowPage: boolean = true): void {

        // If an ID is not set, then default to the page with the 'start' waypoint
        if (!id) {
            const start = this._flow.filter(result => result.node.waypoint === 'start');

            if (start[0]) {
                id = start[0].id;
            } else {
                // Warn if no start point has been specified
                console.warn('No "start" node has been specified.  Please select a starting node in the admin panel');
            }
        }

        if (id !== 'start' && id !== 'end') {
            id = Number(id);
        }

        // Filter the flow array to return the latest page
        this._page = this._flow.filter(result => result.id === id);

        if (typeof this._page[0] === 'undefined') {
            console.warn('There was a problem finding page ' + id);
            return;
        }

        const page = this._page[0];
        const node = page.node;
        let inputs: any = {};

        // If inputs are not established, add skip flag
        if (typeof node.inputs === 'undefined' || !node.inputs) {
            inputs = {'inputs': false};
        }

        // If media is set, then add that to our input data
        if (typeof node.media !== 'undefined' && node.media) {
            inputs.mediaType = this._getFileExtension(node.media);
        }

        // Recognize pages which may be skipped upon move back
        if (
            typeof inputs.mediaType !== 'undefined' &&
            inputs.mediaType === 'mp3' &&
            !node.subtitle &&
            (!node.content || node.content === '')
        ) {
            inputs.skip = true;
        }

        // Update the URI
        this.updateLocationUri(id);

        // Update the user reflection
        if (updateFlowPage) {
            this.updateReflection(id, inputs);
        }

        // Update the current page
        if (this._page.length > 0) {
            this.page$.next(page);
        } else {
            console.warn(`Page ID '${id}' does not exist.`);
        }
    }

    // Reflection is being deprecated in favor of *UserPath
    updateReflection(id: number, data: any = {}): void {

        // Retrieve the reflection
        const reflections = this._reflection.filter(result => result.id === id);

        // Find the reflection which matches the current reference ID.  This will ensure that the appropriate data is assigned
        let reflection = reflections.filter(result => result.reference === this._reference).slice(-1)[0];

        if (typeof reflection === 'undefined') {
            this._reference = this._randomNumber();
            reflection = {
                'id': id,
                'timestamp': Date.now(),
                'reference': this._reference
            };

            // If data is not empty, then push it in
            if (Object.keys(data).length) {
                reflection.data = data;
            }

            // Add to the reflection
            this._reflection.push(reflection);

        } else if (reflection) {

            // If the reflection was previously defined, then update the timestamp as we're leaving that page
            data.duration = (Date.now() - reflection.timestamp);

            // Push all data into the reflection
            reflection.data = data;
        }

        // Update the reflection
        if (this._reflection.length) {
            this.reflection$.next(this._reflection);

            // Save the reflection to local storage
            // this._updateLocalStorage(this._reflection);
        } else {
            console.warn(`Reflection update failed.`);
        }
    }

    updateMediaFile(path: string): void {
        this.media$.next(path);
    }

    updateTheme(object: any): void {
        this.theme$.next(object);
    }

    updateUserPath(page: any) {

        // If the current path is empty, attempt to get historical paths from local storage
        if (!this.path.length && (this._storage.get('malcolmUserPath') && this._storage.get('malcolmUserPath').length > 0)) {
            this.path = this._storage.get('malcolmUserPath');
        }

        // If the page is a redirection page, then don't include it, unless the media file is an MP4
        if (page.redirect && (page.media && !page.media.includes('mp4'))) {
            return;
        }

        // If the last page was the same as this one, then don't include it
        if (this.path.length > 0 && this.path[this.path.length - 1].id === page.id) {
            return;
        }

        // Add the page data to the path
        this.path.push({
            id: page.id,
            waypoint: page.waypoint,
            timestamp:  new Date().toISOString()
        });

        // Store the updated path data to local storage
        this._storage.set('malcolmUserPath', this.path);

        // Send the latest page to the interactions table
        // TODO, add function
    }

    updateLocationUri(id: any, assignmentId: any = null) {

        let flowId = 'default';

        // Fallback to the default flow
        if (assignmentId) {
            flowId = assignmentId;
        } else if (this.flowId) {
            flowId = this.flowId;
        }

        if (!id || id === 1) {
            return;
        }
        this._location.replaceState(`onboarding/${this._api.accountId}/${flowId}/${id}`);
    }

    private _updateInputList(flow: any) {
        for (let i = 0; flow.length > i; i++) {
            if (typeof flow[i].node.inputs !== 'undefined' && flow[i].node.inputs.length > 0) {
                const inputs = flow[i].node.inputs;
                for (let k = 0; inputs.length > k; k++) {
                    this._inputs.inputList.push(inputs[k]);
                }
            }
        }
    }

    private _randomNumber() {
        const min = 1;
        const max = 100000000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private _getFileExtension(path: string) {
        return path.split('.').pop();
    }

    private _updateLocalStorage(data: any): void {

        const reflection = this._storage.get('malcolmReflectionData');
        const array = reflection ? reflection : {};
        const id = this.flowId;

        array[id] = data;

        this._storage.set('malcolmReflectionData', array);
    }
}
