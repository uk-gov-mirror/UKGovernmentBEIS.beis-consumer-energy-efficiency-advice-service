import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-spinner-and-error-container',
    templateUrl: './spinner-and-error-container.component.html',
    styleUrls: ['./spinner-and-error-container.component.scss']
})
export class SpinnerAndErrorContainerComponent {
    @Input() loading: boolean;
    @Input() error: boolean;
    @Input() errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later";
    @Input() showLink: boolean;
    @Input() linkMessage: string;
    @Input() linkAddress: string;
}
