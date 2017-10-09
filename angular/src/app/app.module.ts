import {BrowserModule} from "@angular/platform-browser";
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

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        CalculatorComponent,
        PostcodeEpcComponent,
        OcrComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RoutingModule,
        FormsModule
    ],
    providers: [WordpressApiService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
