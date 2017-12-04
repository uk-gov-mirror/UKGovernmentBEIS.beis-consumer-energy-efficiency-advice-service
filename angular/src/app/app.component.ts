import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/distinctUntilChanged';
import {GoogleAnalyticsService} from "./shared/analytics/google-analytics.service";
import {SVGCacheService} from "ng-inline-svg";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svgService: SVGCacheService
    ) {
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
            if (GoogleAnalyticsService.GOOGLE_ANALYTICS_SUPPORTED) {
                this.googleAnalyticsService.recordPageView();
            }
        });

        // Set base URL for inline-svg directive
        this.svgService.setBaseUrl({baseUrl: '/wp-content/themes/angular-theme/dist/assets/images/'});
    }
}
