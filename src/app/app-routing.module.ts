import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AboutUsComponent} from './pages/about-us.component';
import {ContactUsComponent} from './pages/contact-us.component';
import {OnboardingComponent} from './pages/onboarding.component';
import {DashboardComponent} from './pages/dashboard.component';

const routes: Routes = [
    {path: '', redirectTo: '/onboarding', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'contact', component: ContactUsComponent},
    {path: 'onboarding/:accountId/:flow/:id', component: OnboardingComponent},
    {path: 'onboarding/:accountId/:flow', component: OnboardingComponent},
    {path: 'onboarding/:accountId/', component: OnboardingComponent},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
