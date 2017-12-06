import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/distinctUntilChanged';
import {GoogleAnalyticsService} from "./shared/analytics/google-analytics.service";
import {SVGCacheService} from "ng-inline-svg";
import {CookieService} from "ng2-cookies";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private static readonly ALPHA_ALERT_COOKIE_NAME = 'beis-dceas_alpha-alert-provided';

    constructor(
        private router: Router,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svgService: SVGCacheService,
        private cookieService: CookieService
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
            this.googleAnalyticsService.recordPageView();
        });

        // Set base URL for inline-svg directive
        this.svgService.setBaseUrl({baseUrl: '/wp-content/themes/angular-theme/dist/assets/images/'});

        // TODO: remove this alert which applies to Alpha only
        if(!this.cookieService.check(AppComponent.ALPHA_ALERT_COOKIE_NAME)) {
            window.alert('This is an Alpha. It is not intended to be fully functional, and in particular not all the ' +
                'questions are taken into account when generating recommendations. The final site would include more ' +
                'detailed recommendations.');
            this.cookieService.set(AppComponent.ALPHA_ALERT_COOKIE_NAME, 'true');
        }
    }
}
