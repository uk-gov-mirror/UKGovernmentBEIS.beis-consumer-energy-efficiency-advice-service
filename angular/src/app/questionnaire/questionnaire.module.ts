import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {QuestionnaireComponent} from './questionnaire.component';
import {QuestionDirective} from './question.directive';
import {QuestionnaireService} from './questions/questionnaire.service';
import {ElectricityTariffQuestionComponent} from './questions/electricity-tariff-question/electricity-tariff-question.component';
import {BoilerTypeQuestionComponent} from './questions/boiler-type-question/boiler-type-question.component';
import {FlatPositionQuestionComponent} from './questions/flat-position-question/flat-position-question.component';
import {FuelTypeQuestionComponent} from './questions/fuel-type-question/fuel-type-question.component';
import {BedroomsQuestionComponent} from './questions/bedrooms-question/bedrooms-question.component';
import {StoreysQuestionComponent} from './questions/storeys-question/storeys-question.component';
import {NumberQuestionComponent} from './common/number-question/number-question.component';
import {HomeAgeQuestionComponent} from './questions/home-age-question/home-age-question.component';
import {HomeTypeQuestionComponent} from './questions/home-type-question/home-type-question.component';
import {PostcodeEpcQuestionComponent} from './questions/postcode-epc-question/postcode-epc-question.component';
import {ConfirmEpcQuestionComponent} from './questions/confirm-epc-question/confirm-epc-question.component';
import {ProgressIndicatorComponent} from './progress-indicator/progress-indicator.component';
import {CommonModule} from "../common/common.module";

@NgModule({
    declarations: [
        QuestionnaireComponent,
        QuestionDirective,
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
        ProgressIndicatorComponent,
    ],
    exports: [
        QuestionnaireComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
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
    ]
})
export class QuestionnaireModule {
    static forRoot() {
        return {
            ngModule: QuestionnaireModule,
            providers: [QuestionnaireService]
        };
    }
}