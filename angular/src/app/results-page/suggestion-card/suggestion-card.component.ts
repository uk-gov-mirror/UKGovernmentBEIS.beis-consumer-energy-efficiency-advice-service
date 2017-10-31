import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-suggestion-card',
    templateUrl: './suggestion-card.component.html',
    styleUrls: ['./suggestion-card.component.scss']
})
export class SuggestionCardComponent {
    @Input() heading: string;
}
