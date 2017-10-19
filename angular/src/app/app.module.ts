import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {TJsonViewerModule} from 't-json-viewer';

import {AppComponent} from './app.component';
import {PageComponent} from './page/page.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {PostcodeEpcComponent} from './postcode-epc/postcode-epc.component';
import {WordpressApiService} from './common/service/wordpress-api-service/wordpress-api-service';
import {OcrComponent} from './ocr/ocr.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {QuestionDirective} from './questionnaire/question.directive';
import {QuestionnaireService} from './questionnaire/questions/questionnaire.service';
import {HomeTypeQuestionComponent} from './questionnaire/questions/home-type-question/home-type-question.component';
import {HomeAgeQuestionComponent} from './questionnaire/questions/home-age-question/home-age-question.component';
import {ResponseData} from "./response-data/response-data";
import {StoreysQuestionComponent} from "./questionnaire/questions/storeys-question/storeys-question.component";
import {PostcodeEpcQuestionComponent} from "./questionnaire/questions/postcode-epc-question/postcode-epc-question.component";
import {FuelTypeQuestionComponent} from "./questionnaire/questions/fuel-type-question/fuel-type-question.component";
import {FlatPositionQuestionComponent} from "./questionnaire/questions/flat-position-question/flat-position-question.component";
import {NumberQuestionComponent} from "./questionnaire/common/number-question/number-question.component";
import {BedroomsQuestionComponent} from "./questionnaire/questions/bedrooms-question/bedrooms-question.component";
import {TimesPipe} from './common/times/times.pipe';
import {BoilerTypeQuestionComponent} from './questionnaire/questions/boiler-type-question/boiler-type-question.component';
import {ElectricityTariffQuestionComponent} from './questionnaire/questions/electricity-tariff-question/electricity-tariff-question.component';
import {ProgressIndicatorComponent} from './questionnaire/progress-indicator/progress-indicator.component';
import {ResponseSummaryComponent} from './response-summary/response-summary.component';
import {ConfirmEpcQuestionComponent} from './questionnaire/questions/confirm-epc-question/confirm-epc-question.component';
import {QuestionContentService} from './common/service/question-content-service/question-content.service';

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        CalculatorComponent,
        PostcodeEpcComponent,
        OcrComponent,
        OcrComponent,
        QuestionDirective,
        QuestionnaireComponent,
        ProgressIndicatorComponent,
        PostcodeEpcQuestionComponent,
        ConfirmEpcQuestionComponent,
        HomeTypeQuestionComponent,
        HomeAgeQuestionComponent,
        NumberQuestionComponent,
        StoreysQuestionComponent,
        BedroomsQuestionComponent,
        FuelTypeQuestionComponent,
        FlatPositionQuestionComponent,
        BoilerTypeQuestionComponent,
        ElectricityTariffQuestionComponent,
        TimesPipe,
        ResponseSummaryComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule,
        TJsonViewerModule,
    ],
    entryComponents: [
        PostcodeEpcQuestionComponent,
        ConfirmEpcQuestionComponent,
        HomeTypeQuestionComponent,
        HomeAgeQuestionComponent,
        StoreysQuestionComponent,
        BedroomsQuestionComponent,
        FuelTypeQuestionComponent,
        HomeTypeQuestionComponent,
        FlatPositionQuestionComponent,
        BoilerTypeQuestionComponent,
        ElectricityTariffQuestionComponent,
    ],
    providers: [WordpressApiService, QuestionnaireService, ResponseData, QuestionContentService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
