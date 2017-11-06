import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-spinner-and-error-container',
    templateUrl: './spinner-and-error-container.component.html',
    styleUrls: ['./spinner-and-error-container.component.scss']
})
export class SpinnerAndErrorContainerComponent {
    @Input() loading: boolean;
    @Input() error: boolean;

    constructor() {
        console.log(this.loading);
        console.log(this.error);
    }
}
