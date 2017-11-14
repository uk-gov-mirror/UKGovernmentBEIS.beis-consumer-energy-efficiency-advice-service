import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {PageService} from "./page.service";
import {Page} from "./page";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

    pageData: Page;
    isLoading: boolean;
    isError: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private pageService: PageService) {
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

    displayPage(pageData: Page): void {
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
