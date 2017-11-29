import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageComponent} from "./page/page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {HomeImprovementsComponent} from "./landing-page/home-improvements/home-improvements.component";
import {CarbonFootprintComponent} from "./landing-page/carbon-footprint/carbon-footprint.component";
import {ReduceBillsComponent} from "./landing-page/reduce-bills/reduce-bills.component";
import {WarmerHomeComponent} from "./landing-page/warmer-home/warmer-home.component";
import {BoilerLandingPageComponent} from "./boiler/landing-page/boiler-landing-page.component";
import {GrantsQuestionnaireComponent} from "./grants/grants-questionnaire/grants-questionnaire.component";
import {EnergyEfficiencyQuestionnaireComponent} from "./energy-efficiency/energy-efficiency-questionnaire/energy-efficiency-questionnaire.component";
import {EnergyEfficiencyQuestionnaireGuard} from "./energy-efficiency/energy-efficiency-questionnaire/energy-efficiency-questionnaire.guard";
import {BoilerEpcReplaceComponent} from "./boiler/epc-replace/boiler-epc-replace.component";
import {GrantsLandingPageComponent} from "./grants/landing-page/grants-landing-page.component";
import {EnergyEfficiencyResultsComponent} from "./energy-efficiency/energy-efficiency-results/energy-efficiency-results.component";
import {EnergyEfficiencyResultsRouteGuard} from "./energy-efficiency/energy-efficiency-results/energy-efficiency-results.guard";
import {BoilerQuestionnaireComponent} from "./boiler/boiler-questionnaire/boiler-questionnaire.component";
import {BoilerResultsPageComponent} from "./boiler/results-page/boiler-results-page.component";
import {BoilerResultsPageRouteGuard} from "./boiler/results-page/boiler-results-page.guard";
import {BoilerReplacementPageComponent} from "./boiler/replacement-page/boiler-replacement-page.component";
import {BoilerMakeModelReplaceComponent} from "./boiler/make-model-replace/boiler-make-model-replace.component";
import {BoilerAdvicePageComponent} from "./boiler/advice-page/boiler-advice-page.component";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
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
        path: 'js/grants',
        component: GrantsLandingPageComponent
    },
    {
        path: 'js/grants/questionnaire',
        component: GrantsQuestionnaireComponent
    },
    {
        path: 'js/carbon-footprint',
        component: CarbonFootprintComponent
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
        component: BoilerLandingPageComponent
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
        path: ':slug',
        component: PageComponent
    },
    {
        path: ':section/:slug',
        component: PageComponent
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
