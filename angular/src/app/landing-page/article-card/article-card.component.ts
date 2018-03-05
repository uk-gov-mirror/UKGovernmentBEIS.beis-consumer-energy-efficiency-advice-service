import {Component, Input} from "@angular/core";
import {Article} from "./article";

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article: Article;
}
