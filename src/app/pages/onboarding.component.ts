import {Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, isDevMode, AfterContentInit} from '@angular/core';
import {NavigationService} from '../services/navigation.service';
import {Observable, Subscription} from 'rxjs';
import {ApiService} from '../services/api.service';
import {InputsService} from '../services/inputs.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import {Request} from '../request';
import {Page} from '../page';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatIconRegistry} from '@angular/material/icon';
import {AssignmentService} from '../services/assignment.service';
import {HttpClient} from '@angular/common/http';
import {ContentImageViewerComponent} from '../components/content-image-viewer/content-image-viewer.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';

// Not actually a feature flag, but a const for now.
//
// jdowdell - hacking off media as of 11/7/2020.  We are playing audio in the InHealth
// app "out of band", instead of playing inside the WebView via Malcolm.  This will
// break "Malcolm for desktop".
const FEATURE_FLAG_HACK_OFF_MEDIA_PLAYING = true;

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.sass']
})
export class OnboardingComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild('videoPlayer') mediaplayer: ElementRef;
    @Output() updateTheme = new EventEmitter<string>();

    private _apiSubscription: Subscription;
    private _pageSubscription: Subscription;
    private _reflectionSubscription: Subscription;
    private _mediaTimestamp = {start: null, end: null, duration: null};

    public id: string;
    public flow: any = {};
    public page: any = {};
    public reflection: any = [];
    public classes: any;
    public error: any;
    public hasContent;
    public hasInputs;
    public replay = false;
    public message: string;
    public duration: any = Date.now();
    public playing = false;
    public showControls = false;

    public media: string = null;
    public type: string = null;
    public skip = false;
    public back = false;  // TODO - the nav back button appears busted, so we're hardcoding it off.

    public progress = 0;

    constructor(
        private _navigation: NavigationService,
        private _api: ApiService,
        private _route: ActivatedRoute,
        private _inputs: InputsService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _assignment: AssignmentService,
        private _http: HttpClient,
        private _icons: MatIconRegistry,
        private _sanitizer: DomSanitizer
    ) {
        _icons.addSvgIcon('play', _sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/play.svg'));
        _icons.addSvgIcon('pause', _sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/pause.svg'));
        _icons.addSvgIcon('skip_next', _sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/skip_next.svg'));
    }

    ngOnInit() {

        this._route.paramMap.subscribe(params => {
            this._navigation.flowId = this._api.flowId = params.get('flow');
            this.id = params.get('id');

            // If a reflection pre-exists in local storage, start with that
            const newId = this._navigation.updateInitReflection();
            if (newId && !this.id) {
                this.id = newId;
            }
        });
        this.getFlow();
        this.getReflection();
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
        this._apiSubscription.unsubscribe();
        this._pageSubscription.unsubscribe();
        this._reflectionSubscription.unsubscribe();
    }

    /**
     * Returns all pages and inputs
     */
    getFlow(): void {
        this._apiSubscription = this._api.getFlow()
            .subscribe((data: Request) => {
                    if (!data.success) {
                        this.error = data.message;
                    }
                    this._api.flowId = data.message;
                    this.flow = data.result.nodes;
                    this._assignment.changeAssignment(parseInt(data.message, 10));

                    if (typeof this.flow !== 'undefined') {
                        this._navigation.updateFlowSource(data.result.nodes, +this.id);
                    }
                },
                error => {
                    console.warn(error);
                    this.error = 'We were unable to retrieve this page.<br><small>Please contact us if the issue persists.</small>';
                }
            );

        // Initialize the page subscription
        this.getPage();
    }

    /**
     * Returns all content for the current page
     */
    getPage(): void {

        let page = null;

        this._pageSubscription = this._navigation.getFlowPage()
            .subscribe(data => {

                    // The page may return as an array of objects which is invalid
                    if (typeof data === 'undefined' ||
                        typeof data.id === 'undefined') {
                        return;
                    }

                    // Reset the variables with the new page
                    page = data.node;
                    this.page = page;
                    this.id = this.page.id = data.id;
                    this.media = null;
                    this.type = null;
                    this.skip = false;
                    this.replay = false;
                    this.duration = Date.now();
                    this.back = false;  // see TODO

                    // If points are assigned for this node, send them to user
                    if (page.points) {
                        this._inputs.submitUserPoints(page.points);
                    }

                    // Update the background ID for the app component
                    this._navigation.updateTheme({
                        background: (!page.background ? false : page.background),
                        theme: !page.theme ? 'light' : page.theme
                    });

                    // Verify the status of page content
                    this._checkPageForContent();

                    // Adjust justification if necessary
                    this._justifyContentLeftOnMaxWidth();

                    // Update the progress bar
                    // this._determinePathProgress();

                    // Retrieve any attributes
                    this.classes = '';
                    if (typeof page.attributes !== 'undefined' && typeof page.attributes.class !== 'undefined') {
                        this.classes = page.attributes.class;
                    }

                    // Add this page to the user's path
                    this._navigation.updateUserPath(page);

                    // If the current page is a 'start' page, then don't allow user to go back
                    if (this._navigation.path.length <= 1 || page.waypoint === 'start') {
                        this.back = false;
                    }

                    // Check for media files, and trigger them if available
                    if (page.media) {
                        this.loadMediaFile(page.media);
                    }

                    // Scroll the page back to the top
                    this._scrollPageToTop();
                },
                error => this.error = error
            );
    }

    /**
     * Returns the current user's reflection (steps / inputs entered)
     */
    getReflection(): void {
        this._reflectionSubscription = this._navigation.getReflection()
            .subscribe(data => {
                this.reflection = data;
            });
    }

    /**
     * Note that the current media file has ended
     */
    mediaEnded() {
        const redirect = +this.page.redirect;

        // Update the database with the media interaction
        // TODO: this should be updated to use a media ID
        if (this.media && this._mediaTimestamp.duration) {
            this._inputs.setInputsDb([{
                reference_id: this.media.split('/').pop(),
                interaction: this._mediaTimestamp.duration
            }], this.id).then((data: any) => {
            });
        }

        // If redirect is specified, when the media is complete, redirect
        if (typeof redirect !== 'undefined' && redirect) {
            this._navigation.updateFlowPage(redirect);
        }
    }

    /**
     * Play the current media file
     * @param {any} callback
     */
    mediaPlay(callback = null) {

        const $this = this;

        if (!FEATURE_FLAG_HACK_OFF_MEDIA_PLAYING) {
            this.mediaplayer.nativeElement.play().then(response => {
                this.playing = true;
                if (callback) {
                    callback();
                }
            }).catch(function (error) {
                $this._snackBar.open(`The media file was unable to be played. Please reload the page or place this page later in the process. (${error})`, '', {
                    duration: 5000
                });
            });
        }
    }

    /**
     * Pause the current media file
     */
    mediaPause() {
        this.mediaplayer.nativeElement.pause();
        this.playing = false;
    }

    /**
     * Skip to the next page
     */
    mediaSkip() {
        // Stop the media player
        this._clearMediaPlayer();

        // Show all delayed inputs
        this.checkInputStatus(null, true);

        // If a redirect is present, then redirect
        this.mediaEnded();
    }

    /**
     * Replay a media file
     */
    replayMedia() {
        this.mediaplayer.nativeElement.load();
    }

    /**
     * Checks inputs with a specified time-in.  If the time-in is elapsed, then remove it to show them.
     *
     * @param data
     * @param {boolean} showAll
     */
    checkInputStatus(data: any = null, showAll = false): void {

        let currentTime;
        const inputs = this.page.inputs;

        if (inputs) {

            if (data) {
                currentTime = data.target.currentTime * 1000;
            }

            for (const input of inputs) {
                if (showAll || typeof input.timein !== 'undefined' && input.timein < currentTime) {
                    delete input.timein;
                }
            }
        }
    }

    /**
     * Qualify, load, and play a media file
     * @param {string} path
     */
    loadMediaFile(path: string): void {
        const $this = this;

        this._getFileStatus(path).then(status => {

            // Verify that the file exists
            if (status) {

                // Update the media file if it is valid
                this._navigation.updateMediaFile(path);

                // If a redirect exists, allow the file to be skipped
                if (+this.page.redirect) {
                    this.skip = true;
                }

                // Retrieve the file type and assign it
                if (path.includes('mp4')) {
                    this.type = 'video/mp4';
                    this.replay = true;
                } else if (path.includes('mp3')) {
                    this.type = 'audio/mp3';
                } else {
                    console.warn('Indeterminate media type: ' + path);
                }

                // Assign the path to the player and begin loading
                this.media = path;
                this.mediaplayer.nativeElement.load();
                this.mediaplayer.nativeElement.$this = this;

                // Wait for the media to be loaded
                this.mediaplayer.nativeElement.addEventListener('loadeddata', this._initMediaPlay, false);

                // Follow the media play time
                this.mediaplayer.nativeElement.addEventListener('timeupdate', this._setMediaTime, false);

                // Wait for the media to complete
                this.mediaplayer.nativeElement.addEventListener('ended', this._initMediaEnded, false);

                // Reset the back variable
                // $this.back = false;
            } else {
                // If the file fails, clear the player and move forward to the target
                console.warn(`File was not found: ${path}`);
                this.showControls = false;
                this._clearMediaPlayer();
                this.mediaEnded();
            }
        });
    }

    /**
     * Moves to the next step back in the reflection
     */
    pageBack() {

        // Retrieve the second-to-last page from the user's path
        const page = this._navigation.path[this._navigation.path.length - 2];

        // Remove the last page so that we don't loop
        this._navigation.path.pop();

        // Update the current page using the stored page ID
        this._navigation.updateFlowPage(page.id, false);
    }

    contentClick(event: MouseEvent): void {
        const target: any = event.target;
        if (target.nodeName === 'IMG' && target.classList.contains('content-image')) {
            this._contentImage(target.src);
        }
    }

    private _initMediaPlay(event) {
        const $this = event.target.$this;

        // Once loaded, play the file
        $this.mediaPlay(function () {
            $this.showControls = true;
        });
    }

    private _initMediaEnded(event) {
        const $this = event.target.$this;

        // Submit the timestamp played to the database


        // Clean up the view
        $this.playing = false;
        $this.checkInputStatus(null, true);
    }

    private _setMediaTime(event) {
        const $this = event.target.$this;

        if (!$this._mediaTimestamp.start) {
            $this._mediaTimestamp.start = event.timeStamp;
        }
        $this._mediaTimestamp.end = event.timeStamp;
        $this._mediaTimestamp.duration = event.timeStamp - $this._mediaTimestamp.start;
    }

    /**
     * Empty and reset the media player and listeners
     * @private
     */
    private _clearMediaPlayer() {
        this.mediaplayer.nativeElement.pause();
        this.mediaplayer.nativeElement.removeEventListener('loadeddata', this._initMediaPlay, false);
        this.mediaplayer.nativeElement.removeEventListener('timeupdate', this._setMediaTime, false);
        this.mediaplayer.nativeElement.removeEventListener('ended', this._initMediaEnded, false);
        this.mediaplayer.nativeElement.removeAttribute('src');
        this.mediaplayer.nativeElement.load();
    }

    /**
     * Determine whether a file exists by head status
     * @param {string} path
     * @param {any} callback
     * @returns {Promise<boolean>}
     * @private
     */
    private _getFileStatus(path: string, callback = null): Promise<boolean> {
        return this._http.head(path)
            .mapTo(true)
            .catch((error) => Observable.of(false))
            .toPromise();
    }

    /**
     * Check whether the current page contains text content
     *
     * @private
     */
    private _checkPageForContent(): void {
        const page = this.page;
        this.hasContent = page.title || page.subtitle || page.content;
    }

    /**
     * Determine whether the current page has inputs
     *
     * @private
     */
    private _checkPageHasInputs(): void {
        this.hasInputs = typeof this.page.inputs !== 'undefined';
    }

    private _justifyContentLeftOnMaxWidth(): void {

        if (!this.hasContent) {
            return;
        }

        let title: HTMLElement;
        let subTitle: HTMLElement;
        let pageContent: HTMLElement;

        if (typeof this.page.title !== 'undefined' && this.page.title) {
            title = document.getElementById('pageTitle');

            // HACK - set the header title (since this seems to be the closest
            // connection point in the old malcolm code, since it assumed the
            // page title would be in the content itself.
            document.getElementById('headerPageTitle').innerText=this.page.title;
        }
        // const subTitle: HTMLElement = document.getElementById('pageSubTitle');
        // const pageContent: Element = document.getElementById('pageContent');

        if (title || subTitle || pageContent) {
            // console.log(title.clientWidth);
        }
    }

    private _scrollPageToTop(): void {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    private _openAuthDialog() {
        const dialogRef = this._dialog.open(OnboardingAuthenticateComponent, {
            disableClose: true,
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    private _determinePathProgress() {

        // Get the total number of non-redirecting pages
        const flowPageIds = [];
        for (let p = 0; this.flow.length > p; p++) {
            if (!this.flow[p].node.redirect) {
                flowPageIds.push(this.flow[p].id);
            }
        }

        // Get the total number of unique user path pages in this assignment
        const uniquePathIds = [];
        for (let i = 0; this._navigation.path.length > i; i++) {
            if (!uniquePathIds.includes(this._navigation.path[i].id)) {
                uniquePathIds.push(this._navigation.path[i].id);
            }
        }

        // Compare the total number of applicable pages against the number of unique pages visited
        this.progress = ((uniquePathIds.length / flowPageIds.length) * 100);
    }

    private _contentImage(src: string): void {
        this._dialog.open(ContentImageViewerComponent, {
            width: '100%',
            data: {
                src,
            },
            panelClass: 'image-panel',
        });
    }
}

@Component({
    selector: 'app-onboarding-authenticate',
    template: `
        <h2 mat-dialog-title>
            You're doing great!
            <small>Sign up so that we can save your progress</small>
        </h2>
        <div fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="10px">
            <mat-form-field fxFlex="50">
                <input matInput [(ngModel)]="firstName" type="text" name="first_name" placeholder="First Name">
            </mat-form-field>
            <mat-form-field fxFlex="50">
                <input matInput [(ngModel)]="lastName" type="text" name="last_name" placeholder="Last Name">
            </mat-form-field>
        </div>
        <div fxLayout="row" fxLayoutAlign="space-around center">
            <mat-form-field fxFlex="100">
                <input matInput [(ngModel)]="emailAddress" type="email" name="email_address" placeholder="Email Address">
            </mat-form-field>
        </div>
        <!--<div fxLayout="row" fxLayoutAlign="space-around center">-->
        <!--<mat-form-field fxFlex="100">-->
        <!--<input matInput type="tel" name="phone_number" placeholder="Phone Number (optional)">-->
        <!--</mat-form-field>-->
        <!--</div>-->
        <!--<div fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="10px">-->
        <!--<mat-form-field fxFlex="50">-->
        <!--<input matInput type="password" name="password" placeholder="Password">-->
        <!--</mat-form-field>-->
        <!--<mat-form-field fxFlex="50">-->
        <!--<input matInput type="password" name="password_confirmation" placeholder="Confirm Password">-->
        <!--</mat-form-field>-->
        <!--</div>-->
        <button mat-raised-button color="primary" (click)="signUp()">Create Account</button>
    `,
    styles: [`
        h2 {
            font-size: 32px;
        }

        small {
            font-size: 65%;
            line-height: 2em;
            display: block;
        }
    `]
})
export class OnboardingAuthenticateComponent {

    public firstName;
    public lastName;
    public emailAddress;

    constructor(
        private _api: ApiService
    ) {
    }

    signUp() {

        const body = {
            first_name: this.firstName,
            last_name: this.lastName,
            phone_number: '',
            email: this.emailAddress,
        };
        this._api.createUser(body);
    }
}
