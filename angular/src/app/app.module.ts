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
import {DummyQuestionComponent} from "./questionnaire/questions/dummy-question/dummy-question.component";
import {QuestionDirective} from "./questionnaire/questions/question.directive";
import {QuestionService} from "./questionnaire/questions/question.service";

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        CalculatorComponent,
        PostcodeEpcComponent,
        OcrComponent,
        QuestionDirective,
        QuestionnaireComponent,
        DummyQuestionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule
    ],
    entryComponents: [
        DummyQuestionComponent
    ],
    providers: [WordpressApiService, QuestionService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
