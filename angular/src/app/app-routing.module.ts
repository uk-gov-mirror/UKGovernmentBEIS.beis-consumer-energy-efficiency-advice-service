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

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'questionnaire/:name',
        component: QuestionnaireComponent,
        canActivate: [QuestionnaireGuard],
    },
    {
        path: 'results',
        component: ResultsPageComponent,
        canActivate: [ResultsPageRouteGuard]
    },
    {
        path: 'carbon-footprint',
        component: CarbonFootprintComponent
    },
    {
        path: 'home-improvements',
        component: HomeImprovementsComponent
    },
    {
        path: 'reduce-bills',
        component: ReduceBillsComponent
    },
    {
        path: 'warmer-home',
        component: WarmerHomeComponent
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
