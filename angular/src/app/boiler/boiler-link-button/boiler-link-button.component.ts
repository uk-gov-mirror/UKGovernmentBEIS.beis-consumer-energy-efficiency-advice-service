import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-boiler-link-button',
    templateUrl: './boiler-link-button.component.html',
    styleUrls: ['./boiler-link-button.component.scss']
})
export class BoilerLinkButtonComponent {
    @Input() text: string;
    @Input() path: string;
}
