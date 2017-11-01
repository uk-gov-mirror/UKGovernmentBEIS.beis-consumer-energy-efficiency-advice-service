import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {TJsonViewerModule} from "t-json-viewer";

import {AppComponent} from "./app.component";
import {QuestionnaireModule} from "./questionnaire/questionnaire.module";
import {SharedModule} from "./common/shared.module";
import {ResultsPageModule} from "./results-page/results-page.module";
import {ResponseSummaryComponent} from "./response-summary/response-summary.component";
import {HomePageModule} from "./home-page/home-page.module";
import {LandingPageModule} from "./landing-page/landing-page.module";

@NgModule({
    declarations: [
        AppComponent,
        ResponseSummaryComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule,
        TJsonViewerModule,
        SharedModule.forRoot(),
        QuestionnaireModule.forRoot(),
        ResultsPageModule,
        HomePageModule,
        LandingPageModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
