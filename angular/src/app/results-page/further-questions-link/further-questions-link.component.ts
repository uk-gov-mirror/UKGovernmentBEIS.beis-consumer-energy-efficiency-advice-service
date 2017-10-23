import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-further-questions-link',
    templateUrl: './further-questions-link.component.html',
    styleUrls: ['./further-questions-link.component.scss']
})
export class FurtherQuestionsLinkComponent {
    @Input() iconClassName: string;
    @Input() name: string;
}
