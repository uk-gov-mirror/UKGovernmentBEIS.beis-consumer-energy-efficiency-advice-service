import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../common/shared.module";
import {BehaviourQuestionnaire} from "./behaviour-questionnaire";

@NgModule({
    declarations: [
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    entryComponents: [
    ],
    providers: [BehaviourQuestionnaire]
})
export class BehaviourQuestionnaireModule {
}