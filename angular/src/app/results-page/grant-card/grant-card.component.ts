import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-grant-card',
    templateUrl: './grant-card.component.html',
    styleUrls: ['./grant-card.component.scss']
})
export class GrantCardComponent {
    @Input() title: string;
    @Input() description: string;
}
