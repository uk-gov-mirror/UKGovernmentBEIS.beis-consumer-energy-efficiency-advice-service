import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {PageComponent} from "./page/page.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {PostcodeEpcComponent} from "./postcode-epc/postcode-epc.component";
import {WordpressApiService} from "./common/wordpress-api-service/wordpress-api-service";
import {OcrComponent} from "./ocr/ocr.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {QuestionDirective} from "./questionnaire/questions/question.directive";
import {QuestionService} from "./questionnaire/questions/question.service";
import {HomeTypeQuestionComponent} from './questionnaire/questions/home-type-question/home-type-question.component';
import {AppConstants, Constants} from "./common/constants";

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        CalculatorComponent,
        PostcodeEpcComponent,
        OcrComponent,
        QuestionDirective,
        QuestionnaireComponent,
        HomeTypeQuestionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule
    ],
    entryComponents: [
        HomeTypeQuestionComponent
    ],
    providers: [WordpressApiService, QuestionService, {provide: Constants, useClass: AppConstants}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
