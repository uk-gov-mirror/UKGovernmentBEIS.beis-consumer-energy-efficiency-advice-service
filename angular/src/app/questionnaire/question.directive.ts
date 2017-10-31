import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[question-host]'
})
export class QuestionDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}