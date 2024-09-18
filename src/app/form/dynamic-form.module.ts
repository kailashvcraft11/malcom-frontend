import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Form Components
import {DynamicFormComponent} from './containers/dynamic-form/dynamic-form.component';
import {DynamicFieldDirective} from './components/dynamic-field/dynamic-field.directive';
import {FormButtonComponent} from './components/form-button/form-button.component';
import {FormTextComponent} from './components/form-text/form-text.component';
import {FormSelectComponent} from './components/form-select/form-select.component';
import {FormTextareaComponent} from './components/form-textarea/form-textarea.component';
import {FormRadioComponent} from './components/form-radio/form-radio.component';
import {FormCheckboxComponent} from './components/form-checkbox/form-checkbox.component';
import {FormBreakComponent} from './components/form-break/form-break.component';
import {FormDashboardComponent} from './components/form-dashboard/form-dashboard.component';
import {
    FormScheduleComponent,
    FormScheduleEmailDialogComponent,
    FormScheduleConfirmComponent
} from './components/form-schedule/form-schedule.component';
import {FormRangeComponent} from './components/form-range/form-range.component';
import {FormSliderComponent} from './components/form-slider/form-slider.component';
import {FormInsightsComponent} from './components/form-insights/form-insights.component';
import {FormCoachesComponent, FormCoachesScheduleComponent} from './components/form-coaches/form-coaches.component';
import {FormResultsComponent} from './components/form-results/form-results.component';
import {FormComparisonComponent} from './components/form-comparison/form-comparison.component';
import {FormInvitationComponent} from './components/form-invitation/form-invitation.component';
import {FormLoginComponent, FormLoginResetComponent} from './components/form-login/form-login.component';
import {FormGraphComponent} from './components/form-graph/form-graph.component';
import {FormSortableComponent} from './components/form-sortable/form-sortable.component';
import {InBodyDatePipe} from '../pipes/in-body-date.pipe';
import {SafeHtmlPipe} from '../pipes/safe-html.pipe';

// Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import 'hammerjs';

// Structure
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormInBodyResultsComponent} from './components/form-in-body-results/form-in-body-results.component';
import {FormInBodyLoginComponent} from './components/form-in-body-login/form-in-body-login.component';
import {FormInBodyResponseComponent} from './components/form-in-body-response/form-in-body-response.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxMaskModule} from 'ngx-mask';
import {AppModule} from '../app.module';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTabsModule,
        NgxChartsModule,
        NgxMaskModule.forRoot(),
        MatTableModule,
        MatTooltipModule,
        DragDropModule
    ],
    exports: [
        DynamicFormComponent,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTabsModule,
        NgxChartsModule,
        MatTableModule,
        MatTooltipModule,
        InBodyDatePipe,
        SafeHtmlPipe
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        FormButtonComponent,
        FormTextComponent,
        FormSelectComponent,
        FormTextareaComponent,
        FormRadioComponent,
        FormCheckboxComponent,
        FormBreakComponent,
        FormDashboardComponent,
        FormScheduleComponent,
        FormScheduleEmailDialogComponent,
        FormScheduleConfirmComponent,
        FormRangeComponent,
        FormSliderComponent,
        FormInsightsComponent,
        FormCoachesComponent,
        FormCoachesScheduleComponent,
        FormResultsComponent,
        FormComparisonComponent,
        FormInvitationComponent,
        FormInBodyResultsComponent,
        FormInBodyLoginComponent,
        FormInBodyResponseComponent,
        FormLoginResetComponent,
        FormGraphComponent,
        FormSortableComponent,
        InBodyDatePipe,
        SafeHtmlPipe,
    ],
    entryComponents: [
        FormButtonComponent,
        FormTextComponent,
        FormSelectComponent,
        FormTextareaComponent,
        FormRadioComponent,
        FormCheckboxComponent,
        FormBreakComponent,
        FormDashboardComponent,
        FormScheduleComponent,
        FormScheduleEmailDialogComponent,
        FormScheduleConfirmComponent,
        FormRangeComponent,
        FormSliderComponent,
        FormInsightsComponent,
        FormCoachesComponent,
        FormCoachesScheduleComponent,
        FormResultsComponent,
        FormComparisonComponent,
        FormInvitationComponent,
        FormInBodyResultsComponent,
        FormInBodyLoginComponent,
        FormInBodyResponseComponent,
        FormLoginComponent,
        FormLoginResetComponent,
        FormGraphComponent,
        FormSortableComponent,
    ]
})
export class DynamicFormModule {
}
