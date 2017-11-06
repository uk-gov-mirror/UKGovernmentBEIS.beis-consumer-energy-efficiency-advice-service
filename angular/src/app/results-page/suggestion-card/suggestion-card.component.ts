import {Component, Input} from "@angular/core";
import {WordpressPage} from "../../shared/wordpress-pages-service/wordpress-page";

@Component({
    selector: 'app-suggestion-card',
    templateUrl: './suggestion-card.component.html',
    styleUrls: ['./suggestion-card.component.scss']
})
export class SuggestionCardComponent {
    @Input() page: WordpressPage;
}
