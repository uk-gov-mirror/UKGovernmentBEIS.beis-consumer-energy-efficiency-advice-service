import {Component, Input} from '@angular/core';

export type LinkButtonVariant = 'default' | 'green';
export type NavigationType = 'router' | 'href';


@Component({
    selector: 'app-link-button',
    templateUrl: './link-button.component.html',
    styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent {
    @Input() buttonText: string;
    @Input() linkUrl: string;
    @Input() type: NavigationType = 'href';
    @Input() centred?: boolean;
    @Input() variant: LinkButtonVariant = 'default';
    @Input() openInNewTab?: boolean;
}
