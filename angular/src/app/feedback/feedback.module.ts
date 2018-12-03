import {NgModule} from "@angular/core";
import {RoutingModule} from "../app-routing.module";
import {FeedbackComponent} from "./feedback.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        FeedbackComponent
    ],
    exports: [
        FeedbackComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RoutingModule
    ]
})
export class FeedbackModule {
}
