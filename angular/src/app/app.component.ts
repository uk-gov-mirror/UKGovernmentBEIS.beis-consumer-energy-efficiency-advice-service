import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import {GoogleAnalyticsService} from './shared/analytics/google-analytics.service';
import {SVGCacheService} from 'ng-inline-svg';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    shouldExpandNav: boolean = false;
    shouldCloseSearchBar: Subject<any> = new Subject();

    readonly referrerDimensionIndex = 1;
    readonly referrerDimensionName = "referrer id";

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private meta: Meta,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svgService: SVGCacheService
    ) {
        this.meta.addTag({ name: 'viewport', content: 'width=device-width,initial-scale=1.0' });
    }

    ngOnInit() {
        this.router.events.distinctUntilChanged((previous: any, current: any) => {
            if (current instanceof NavigationEnd) {
                return previous.url === current.url;
            }
            return true;
        }).subscribe(() => {
            // Scroll to top when route changes
            window.scrollTo(0, 0);
            // Record route change for Google Analytics tracking if that's supported in this environment
            this.googleAnalyticsService.recordPageView();
        });

        this.handleAdReferral();

        // Set base URL for inline-svg directive
        this.svgService.setBaseUrl({baseUrl: '/dist/assets/images/'});
    }

    toggleMobileNav(): void {
        this.shouldExpandNav = !this.shouldExpandNav;
    }

    closeSearchBar(): void {
        this.shouldCloseSearchBar.next("close");
    }

    hideMobileNav(): void {
        this.shouldExpandNav = false;
    }

    private handleAdReferral(): void {
        this.activatedRoute.queryParamMap.subscribe(queryParams => {
            const referrerId = queryParams.get('referrerid');
            if (referrerId) {
                this.googleAnalyticsService.setSessionDimension(this.referrerDimensionName, this.referrerDimensionIndex, referrerId);
            }

            return {unsubscribe() {}};
        });
    }
}
