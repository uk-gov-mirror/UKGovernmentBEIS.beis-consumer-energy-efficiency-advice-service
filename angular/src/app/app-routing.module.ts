import {NgModule} from "@angular/core";
import {RouterModule, Routes, UrlSegment} from "@angular/router";
import {PageComponent} from "./page/page.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {PostcodeEpcComponent} from "./postcode-epc/postcode-epc.component";
import {OcrComponent} from "./ocr/ocr.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {ResponseSummaryComponent} from "./response-summary/response-summary.component";
import {ResultsPageComponent} from "./results-page/results-page.component";
import {isQuestionnaireType} from "./questionnaire/questionnaires/questionnaire-type";

export function questionnaireMatcher(url: UrlSegment[]) {
   return url.length === 2 && url[0].path === 'questionnaire' && isQuestionnaireType(url[1].path)
        ? {consumed: url, posParams: {type: url[1]}}
        : null;
}

const routes: Routes = [
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
        matcher: questionnaireMatcher,
        component: QuestionnaireComponent
    },
    {
        path: 'responses',
        component: ResponseSummaryComponent
    },
    {
        path: 'results',
        component: ResultsPageComponent
    },
    {
        path: ':slug',
        component: PageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule {
}
