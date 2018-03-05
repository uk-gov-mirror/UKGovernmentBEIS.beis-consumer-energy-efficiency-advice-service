import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {ExtendedWordpressPage} from '../shared/wordpress-pages-service/extended-wordpress-page';

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
