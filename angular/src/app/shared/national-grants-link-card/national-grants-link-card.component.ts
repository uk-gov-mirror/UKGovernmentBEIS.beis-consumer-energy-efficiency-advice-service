import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-national-grants-link-card',
    templateUrl: './national-grants-link-card.component.html',
    styleUrls: ['./national-grants-link-card.component.scss']
})
export class NationalGrantsLinkCardComponent {
    @Input() hasLocalGrants: boolean;
}
