import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {TJsonViewerModule} from "t-json-viewer";

import {AppComponent} from "./app.component";
import {QuestionnaireModule} from "./questionnaire/questionnaire.module";
import {SharedModule} from "./shared/shared.module";
import {ResultsPageModule} from "./results-page/results-page.module";
import {HomePageModule} from "./home-page/home-page.module";
import {LandingPageModule} from "./landing-page/landing-page.module";
import {LayoutComponentsModule} from "./layout-components/layout-components.module";

@NgModule({
    declarations: [
        AppComponent,
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
        LayoutComponentsModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
