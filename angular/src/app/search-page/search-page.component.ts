import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WordpressSearchService} from '../shared/wordpress-search-service/wordpress-search.service';
import {WordpressSearchable} from "../shared/wordpress-search-service/wordpress-searchable";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
    isError: boolean;
    isLoading: boolean;
    results: WordpressSearchable[];

    private searchText: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private wordpressSearchService: WordpressSearchService,
        private pageTitle: PageTitleService) {
    }

    ngOnInit(): void {
        this.pageTitle.set('Search results');
        this.isLoading = true;
        this.results = [];
        this.route.queryParamMap
            .switchMap(params => {
                this.searchText = params.get('q');
                return this.wordpressSearchService.search(this.searchText);
            })
            .subscribe(
                results => this.handleSearchResponse(results),
                err => this.handleSearchError(err)
            );
    }

    private handleSearchResponse(results: WordpressSearchable[]): void {
        this.isLoading = false;
        this.results = results;
    }

    private handleSearchError(err: any) {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }
}
