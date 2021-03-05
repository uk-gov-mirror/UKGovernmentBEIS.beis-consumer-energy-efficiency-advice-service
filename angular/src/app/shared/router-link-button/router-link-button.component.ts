import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-router-link-button',
    templateUrl: './router-link-button.component.html',
    styleUrls: ['./router-link-button.component.scss']
})
export class RouterLinkButtonComponent {
    @Input() text: string;
    @Input() path: string;
}
