import {Component, OnInit} from "@angular/core";
import {WordpressPage} from "../../shared/wordpress-pages-service/wordpress-page";
import {WordpressPagesService} from "../../shared/wordpress-pages-service/wordpress-pages.service";

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

    topLevelPages: WordpressPage[] = [];

    constructor(private wordpressPagesService: WordpressPagesService) {
    }

    ngOnInit() {
        this.wordpressPagesService
            .getTopLevelPages()
            .subscribe(wordpressPages => this.topLevelPages = wordpressPages);
    }
}