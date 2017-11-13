import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageComponent} from "./page/page.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {ResultsPageComponent} from "./results-page/results-page.component";
import {QuestionnaireGuard} from "./questionnaire/questionnaires/questionnaire.guard";
import {ResultsPageRouteGuard} from "./results-page/results-page-route-guard.service";
import {HomePageComponent} from "./home-page/home-page.component";
import {HomeImprovementsComponent} from "./landing-page/home-improvements/home-improvements.component";
import {CarbonFootprintComponent} from "./landing-page/carbon-footprint/carbon-footprint.component";
import {ReduceBillsComponent} from "./landing-page/reduce-bills/reduce-bills.component";
import {WarmerHomeComponent} from "./landing-page/warmer-home/warmer-home.component";
import {BoilerLandingPageComponent} from "./boiler/landing-page/boiler-landing-page.component";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'js/questionnaire/:name',
        component: QuestionnaireComponent,
        canActivate: [QuestionnaireGuard],
    },
    {
        path: 'js/results',
        component: ResultsPageComponent,
        canActivate: [ResultsPageRouteGuard]
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
    providers: [ResultsPageRouteGuard]
})
export class RoutingModule {
}
