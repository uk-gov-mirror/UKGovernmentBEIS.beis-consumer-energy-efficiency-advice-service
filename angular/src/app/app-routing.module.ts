import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page/page.component';
import {MeasurePageComponent} from './measure-page/measure-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {HomeImprovementsComponent} from './landing-page/home-improvements/home-improvements.component';
import {ReduceBillsComponent} from './landing-page/reduce-bills/reduce-bills.component';
import {WarmerHomeComponent} from './landing-page/warmer-home/warmer-home.component';
import {BoilerLandingPageComponent} from './boiler/landing-page/boiler-landing-page.component';
import {GrantsQuestionnaireComponent} from './grants/grants-questionnaire/grants-questionnaire.component';
import {EnergyEfficiencyQuestionnaireComponent} from
'./energy-efficiency/energy-efficiency-questionnaire/energy-efficiency-questionnaire.component';
import {EnergyEfficiencyQuestionnaireGuard} from
'./energy-efficiency/energy-efficiency-questionnaire/energy-efficiency-questionnaire.guard';
import {BoilerEpcReplaceComponent} from './boiler/epc-replace/boiler-epc-replace.component';
import {GrantsLandingPageComponent} from './grants/landing-page/grants-landing-page.component';
import {EnergyEfficiencyResultsComponent} from './energy-efficiency/energy-efficiency-results/energy-efficiency-results.component';
import {EnergyEfficiencyResultsRouteGuard} from './energy-efficiency/energy-efficiency-results/energy-efficiency-results.guard';
import {BoilerQuestionnaireComponent} from './boiler/boiler-questionnaire/boiler-questionnaire.component';
import {BoilerResultsPageComponent} from './boiler/results-page/boiler-results-page.component';
import {BoilerResultsPageRouteGuard} from './boiler/results-page/boiler-results-page.guard';
import {BoilerReplacementPageComponent} from './boiler/replacement-page/boiler-replacement-page.component';
import {BoilerMakeModelReplaceComponent} from './boiler/make-model-replace/boiler-make-model-replace.component';
import {BoilerAdvicePageComponent} from './boiler/advice-page/boiler-advice-page.component';
import {YourPlanPageComponent} from './energy-efficiency/your-plan-page/your-plan-page.component';
import {YourPlanPageGuard} from './energy-efficiency/your-plan-page/your-plan-page.guard';
import {GreenerHomeComponent} from './landing-page/greener-home/greener-home.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {AdminPageGuard} from './admin-page/admin-page.guard';
import {ForbiddenPageComponent} from './shared/forbidden-page/forbidden-page.component';
import {MeesQuestionnaireComponent} from './mees/mees-questionnaire/mees-questionnaire.component';
import {MeesResultsPageComponent} from './mees/results-page/mees-results-page.component';
import {MeesResultsPageRouteGuard} from './mees/results-page/mees-results-page.guard';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: 'js/energy-efficiency/questionnaire/:name',
        component: EnergyEfficiencyQuestionnaireComponent,
        canActivate: [EnergyEfficiencyQuestionnaireGuard],
    },
    {
        path: 'js/energy-efficiency/results',
        component: EnergyEfficiencyResultsComponent,
        canActivate: [EnergyEfficiencyResultsRouteGuard]
    },
    {
        path: 'js/energy-efficiency/your-plan',
        component: YourPlanPageComponent,
        canActivate: [YourPlanPageGuard]
    },
    {
        path: 'js/grants',
        component: GrantsLandingPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'js/grants/questionnaire',
        component: GrantsQuestionnaireComponent,
        pathMatch: 'full'
    },
    {
        path: 'js/greener-home',
        component: GreenerHomeComponent
    },
    {
        path: 'js/home-improvements',
        component: HomeImprovementsComponent
    },
    {
        path: 'js/reduce-bills',
        component: ReduceBillsComponent
    },
    {
        path: 'js/warmer-home',
        component: WarmerHomeComponent
    },
    {
        path: 'js/boiler',
        component: BoilerLandingPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'js/boiler/advice/:slug',
        component: BoilerAdvicePageComponent
    },
    {
        path: 'js/boiler/replace',
        component: BoilerReplacementPageComponent,
    },
    {
        path: 'js/boiler/epc-replace/:lmkKey',
        component: BoilerEpcReplaceComponent
    },
    {
        path: 'js/boiler/make-model-replace/:productIndexNumber',
        component: BoilerMakeModelReplaceComponent,
    },
    {
        path: 'js/boiler/questionnaire',
        component: BoilerQuestionnaireComponent
    },
    {
        path: 'js/boiler/results',
        component: BoilerResultsPageComponent,
        canActivate: [BoilerResultsPageRouteGuard]
    },
    {
        path: 'js/minimum-energy-efficiency-standards/questionnaire',
        component: MeesQuestionnaireComponent,
    },
    {
        path: 'js/minimum-energy-efficiency-standards/results',
        component: MeesResultsPageComponent,
        canActivate: [MeesResultsPageRouteGuard]
    },
    {
        path: 'js/admin',
        component: AdminPageComponent,
        canActivate: [AdminPageGuard]
    },
    {
        path: 'js/forbidden',
        component: ForbiddenPageComponent
    },
    {
        path: 'js/measures/:slug',
        component: MeasurePageComponent,
        pathMatch: 'full'
    },
    {
        path: ':slug',
        component: PageComponent,
        pathMatch: 'full'
    },
    {
        path: ':section/:slug',
        component: PageComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [EnergyEfficiencyResultsRouteGuard]
})
export class RoutingModule {
}
