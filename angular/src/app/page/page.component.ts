import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {ExtendedWordpressPage} from '../shared/wordpress-pages-service/extended-wordpress-page';

/**
 * This component shows Wordpress Posts of type "page", using their "slug" as
 * a unique id.
 * In the database, "slug" is stored as "wp_posts.page_name"
 * In the WP UI, "slug" is shown as "Permalink"
 *
 * Any nesting in the WP posts is ignored, and the post is loaded by slug, and
 * displayed as /pages/:slug
 */
@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

    pageData: ExtendedWordpressPage;
    isLoading: boolean;
    isError: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private pageService: WordpressPagesService) {
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap(params => {
                this.isLoading = true;
                return this.pageService.getPage(params.get('slug'));
            })
            .subscribe(
                (pageData) => this.displayPage(pageData),
                (err) => this.displayErrorAndLogMessage(err)
            );
    }

    displayPage(pageData: ExtendedWordpressPage): void {
        if (!pageData) {
            // TODO:BEISDEAS-201 display a user-visible error here
            // We should show the 404 component here somehow
            this.router.navigate(['/']);
        }
        this.pageData = pageData;
        this.isLoading = false;
    }

    displayErrorAndLogMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }
}
