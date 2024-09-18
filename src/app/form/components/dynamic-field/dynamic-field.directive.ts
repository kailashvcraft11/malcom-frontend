import {Directive, Input, OnInit, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {FormGroup} from '@angular/forms';

// Standard Inputs
import {FormButtonComponent} from '../form-button/form-button.component';
import {FormTextComponent} from '../form-text/form-text.component';
import {FormSelectComponent} from '../form-select/form-select.component';
import {FormTextareaComponent} from '../form-textarea/form-textarea.component';
import {FormRadioComponent} from '../form-radio/form-radio.component';
import {FormCheckboxComponent} from '../form-checkbox/form-checkbox.component';
import {FormBreakComponent} from '../form-break/form-break.component';

// Irregular Inputs
import {FormRangeComponent} from '../form-range/form-range.component';
import {FormSliderComponent} from '../form-slider/form-slider.component';
import {FormDashboardComponent} from '../form-dashboard/form-dashboard.component';
import {FormCoachesComponent} from '../form-coaches/form-coaches.component';
import {FormInsightsComponent} from '../form-insights/form-insights.component';
import {FormScheduleComponent} from '../form-schedule/form-schedule.component';
import {FormResultsComponent} from '../form-results/form-results.component';
import {FormComparisonComponent} from '../form-comparison/form-comparison.component';
import {FormInvitationComponent} from '../form-invitation/form-invitation.component';
import {FormInBodyLoginComponent} from '../form-in-body-login/form-in-body-login.component';
import {FormInBodyResultsComponent} from '../form-in-body-results/form-in-body-results.component';
import {FormInBodyResponseComponent} from '../form-in-body-response/form-in-body-response.component';
import {FormLoginComponent} from '../form-login/form-login.component';
import {FormGraphComponent} from '../form-graph/form-graph.component';
import {FormSortableComponent} from '../form-sortable/form-sortable.component';
import {PointsService} from '../../../services/points.service';

const components = {
    button: FormButtonComponent,
    text: FormTextComponent,
    select: FormSelectComponent,
    textarea: FormTextareaComponent,
    radio: FormRadioComponent,
    checkbox: FormCheckboxComponent,
    break: FormBreakComponent,

    range: FormRangeComponent,
    slider: FormSliderComponent,
    dashboard: FormDashboardComponent,
    coaches: FormCoachesComponent,
    insights: FormInsightsComponent,
    schedule: FormScheduleComponent,
    sortable: FormSortableComponent,
    results: FormResultsComponent,
    comparison: FormComparisonComponent,
    invitation: FormInvitationComponent,
    inbody_login: FormInBodyLoginComponent,
    inbody_results: FormInBodyResultsComponent,
    inbody_response: FormInBodyResponseComponent,
    login: FormLoginComponent,
    graph_horizontal_bar: FormGraphComponent
};

@Directive({
    selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
    @Input()
    config;

    @Input()
    group: FormGroup;

    public component;

    constructor(
        private _resolver: ComponentFactoryResolver,
        private _container: ViewContainerRef,
        private _points: PointsService
    ) {
    }

    ngOnInit() {
        const component = components[this.config.type];

        if (typeof component !== 'undefined') {

            if (component === FormDashboardComponent) {
                this._points.togglePoints(true);
            } else {
                this._points.togglePoints(false);
            }

            const factory = this._resolver.resolveComponentFactory<any>(component);
            this.component = this._container.createComponent(factory);
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }
}
