import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {TJsonViewerModule} from "t-json-viewer";

import {AppComponent} from "./app.component";
import {PageComponent} from "./page/page.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {PostcodeEpcComponent} from "./postcode-epc/postcode-epc.component";
import {OcrComponent} from "./ocr/ocr.component";
import {QuestionnaireModule} from "./questionnaire/questionnaire.module";
import {CommonModule} from "./common/common.module";
import {ResultsPageModule} from "./results-page/results-page.module";
import {ResponseSummaryComponent} from "./response-summary/response-summary.component";

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        CalculatorComponent,
        PostcodeEpcComponent,
        OcrComponent,
        OcrComponent,
        ResponseSummaryComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule,
        TJsonViewerModule,
        CommonModule.forRoot(),
        QuestionnaireModule.forRoot(),
        ResultsPageModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
