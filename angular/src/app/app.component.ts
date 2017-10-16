import {Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import "rxjs/add/operator/distinctUntilChanged";

declare let gtag: any;
declare const gaId: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    readonly title = 'the BEIS DCEAS app';

    constructor(router: Router) {
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
}
