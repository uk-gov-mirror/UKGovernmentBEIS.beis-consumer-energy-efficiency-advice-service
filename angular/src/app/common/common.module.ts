import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {TimesPipe} from "./times/times.pipe";
import {QuestionContentService} from "./question-content/question-content.service";
import {WordpressApiService} from "./wordpress-api-service/wordpress-api-service";
import {ResponseData} from "./response-data/response-data";
import {FeatureFlagRepository} from "./feature-flag/feature-flag.repository";

@NgModule({
    declarations: [
        TimesPipe
    ],
    exports: [
        TimesPipe
    ],
    imports: [
        HttpClientModule
    ],
})
export class CommonModule {
    static forRoot() {
        return {
            ngModule: CommonModule,
            providers: [QuestionContentService, WordpressApiService, ResponseData, FeatureFlagRepository]
        };
    }
}