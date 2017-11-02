import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/distinctUntilChanged';
import {WordpressPagesService} from "./shared/wordpress-pages-service/wordpress-pages.service";
import {PageStateService} from "./shared/page-state-service/page-state.service";

declare let gtag: any;
declare const gaId: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        router: Router,
        public pageStateService: PageStateService,
        private wordpressPagesService: WordpressPagesService
    ) {
        // Configure Google Analytics tracking if that's supported in this environment
        if (typeof gtag !== 'undefined' && typeof gaId !== 'undefined') {
            router.events.distinctUntilChanged((previous: any, current: any) => {
                if (current instanceof NavigationEnd) {
                    return previous.url === current.url;
                }
                return true;
            }).subscribe((x: any) => {
                console.log('router.change', x);
                gtag('config', gaId, {'page_path': x.url});
            });
        }
    }

    ngOnInit() {
        this.pageStateService.showLoading();
        this.wordpressPagesService.fetchTopLevelPages()
            .subscribe(
                () => this.pageStateService.showLoadingComplete(),
                (error) => this.pageStateService.showGenericErrorAndLogMessage(error)
            )
    }
}
