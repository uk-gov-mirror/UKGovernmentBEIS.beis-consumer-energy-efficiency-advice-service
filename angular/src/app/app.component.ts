import {Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/distinctUntilChanged';
import {GoogleAnalyticsService} from "./shared/analytics/google-analytics.service";
import {SVGCacheService} from "ng-inline-svg";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private router: Router,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svgService: SVGCacheService
    ) {
        // Configure Google Analytics tracking if that's supported in this environment
        if (GoogleAnalyticsService.GOOGLE_ANALYTICS_SUPPORTED) {
            router.events.distinctUntilChanged((previous: any, current: any) => {
                if (current instanceof NavigationEnd) {
                    return previous.url === current.url;
                }
                return true;
            }).subscribe(() => {
                this.googleAnalyticsService.recordPageView();
            });
        }

        // Scroll to top when on route change events
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });

        // Set base URL for inline-svg directive
        svgService.setBaseUrl({baseUrl: '/wp-content/themes/angular-theme/dist/assets/images/'});
    }
}
