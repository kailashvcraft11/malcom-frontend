import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatDialog,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBar,
    MatIconModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StorageServiceModule} from 'angular-webstorage-service';

import {AppRoutingModule} from './app-routing.module';
import {DynamicFormModule} from './form/dynamic-form.module';
import {DynamicFormComponent} from './form/containers/dynamic-form/dynamic-form.component';

import {AppComponent, DialogMenuComponent} from './app.component';
import {OnboardingComponent, OnboardingAuthenticateComponent} from './pages/onboarding.component';
import {ContactUsComponent} from './pages/contact-us.component';
import {AboutUsComponent} from './pages/about-us.component';
import {MenuComponent} from './pages/partials/menu.component';
import {ResponsesService} from './services/responses.service';
import {PointsService} from './services/points.service';
import {AssignmentService} from './services/assignment.service';
import {InBodyService} from './services/inbody.service';
import {ImagePreloadDirective} from './image-preload.directive';
import {ContentImageViewerComponent} from './components/content-image-viewer/content-image-viewer.component';
import {DashboardComponent, DashboardLoginDialogComponent} from './pages/dashboard.component';
import {FormLoginComponent} from './form/components/form-login/form-login.component';

import { Angulartics2Module } from 'angulartics2';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        FormsModule,
        AppRoutingModule,
        DynamicFormModule,
        HttpClientModule,
        MatDialogModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        StorageServiceModule,
        ReactiveFormsModule,
        MatIconModule,
        Angulartics2Module.forRoot()
    ],
    exports: [
        DynamicFormComponent,
        FormLoginComponent
    ],
    declarations: [
        AppComponent,
        DialogMenuComponent,
        OnboardingComponent,
        OnboardingAuthenticateComponent,
        ContactUsComponent,
        AboutUsComponent,
        MenuComponent,
        ImagePreloadDirective,
        ContentImageViewerComponent,
        DashboardComponent,
        DashboardLoginDialogComponent,
        FormLoginComponent
    ],
    providers: [
        MatDialog,
        MatSnackBar,
        ResponsesService,
        PointsService,
        AssignmentService,
        InBodyService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogMenuComponent,
        OnboardingAuthenticateComponent,
        ContentImageViewerComponent,
        DashboardLoginDialogComponent,
    ]
})
export class AppModule {
}
