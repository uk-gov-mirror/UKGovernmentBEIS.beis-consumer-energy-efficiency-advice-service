import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageComponent} from "./page/page.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {PostcodeEpcComponent} from "./postcode-epc/postcode-epc.component";
import {OcrComponent} from "./ocr/ocr.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {ResponseSummaryComponent} from "./response-summary/response-summary.component";
import {ResultsPageComponent} from "./results-page/results-page.component";
import {QuestionnaireGuard} from "./questionnaire/questionnaires/questionnaire.guard";
import {ResultsPageRouteGuard} from "./results-page/results-page-route-guard.service";
import {HomePageComponent} from "./home-page/home-page.component";
import {HomeImprovementsComponent} from "./landing-page/home-improvements/home-improvements.component";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'calculator',
        component: CalculatorComponent
    },
    {
        path: 'postcode-epc',
        component: PostcodeEpcComponent
    },
    {
        path: 'ocr',
        component: OcrComponent
    },
    {
        path: 'questionnaire/:name',
        component: QuestionnaireComponent,
        canActivate: [QuestionnaireGuard],
    },
    {
        path: 'responses',
        component: ResponseSummaryComponent
    },
    {
        path: 'results',
        component: ResultsPageComponent,
        canActivate: [ResultsPageRouteGuard]
    },
    {
        path: 'home-improvements',
        component: HomeImprovementsComponent
    },
    {
        path: ':slug',
        component: PageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ResultsPageRouteGuard]
})
export class RoutingModule {
}
