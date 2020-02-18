import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WordpressSearchService} from '../shared/wordpress-search-service/wordpress-search.service';
import {WordpressSearchable} from "../shared/wordpress-search-service/wordpress-searchable";

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
    private searchText: string;
    private results: WordpressSearchable[];
    private isError: boolean;
    private isLoading: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private wordpressSearchService: WordpressSearchService) {
    }

    ngOnInit(): void {
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
