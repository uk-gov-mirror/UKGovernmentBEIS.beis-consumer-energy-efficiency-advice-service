import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageComponent} from "./page/page.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {PostcodeEpcComponent} from "./postcode-epc/postcode-epc.component";
import {OcrComponent} from "./ocr/ocr.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {PostcodeComponent} from './postcode/postcode.component';

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
        path: 'questionnaire',
        component: QuestionnaireComponent
    },
    {
        path: 'postcode',
        component: PostcodeComponent
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
