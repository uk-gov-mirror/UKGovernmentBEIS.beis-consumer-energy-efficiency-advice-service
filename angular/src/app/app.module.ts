import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {PageComponent} from './page/page.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {PostcodeEpcComponent} from './postcode-epc/postcode-epc.component';
import {WordpressApiService} from './common/wordpress-api-service/wordpress-api-service';
import {OcrComponent} from './ocr/ocr.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {QuestionDirective} from './questionnaire/questions/question.directive';
import {QuestionService} from './questionnaire/questions/question.service';
import {HomeTypeQuestionComponent} from './questionnaire/questions/home-type-question/home-type-question.component';
import {HomeAgeQuestionComponent} from './questionnaire/questions/home-age-question/home-age-question.component';
import {ResponseData} from "./questionnaire/questions/response-data";
import {StoreysQuestionComponent} from "./questionnaire/questions/storeys-question/storeys-question.component";
import {PostcodeEpcQuestionComponent} from "./questionnaire/questions/postcode-epc-question/postcode-epc-question.component";
import {FuelTypeQuestionComponent} from "./questionnaire/questions/fuel-type-question/fuel-type-question.component";
import {FlatPositionQuestionComponent} from "./questionnaire/questions/flat-position-question/flat-position-question.component";
import {NumberQuestionComponent} from "./questionnaire/common/number-question/number-question.component";
import {BedroomsQuestionComponent} from "./questionnaire/questions/bedrooms-question/bedrooms-question.component";
import { TimesPipe } from './common/times/times.pipe';
import {BoilerTypeQuestionComponent} from './questionnaire/questions/boiler-type-question/boiler-type-question.component';
import {ElectricityTariffQuestionComponent} from './questionnaire/questions/electricity-tariff-question/electricity-tariff-question.component';

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
        PostcodeEpcQuestionComponent,
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
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule
    ],
    entryComponents: [
        PostcodeEpcQuestionComponent,
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
    providers: [WordpressApiService, QuestionService, ResponseData],
    bootstrap: [AppComponent],
})
export class AppModule {
}
