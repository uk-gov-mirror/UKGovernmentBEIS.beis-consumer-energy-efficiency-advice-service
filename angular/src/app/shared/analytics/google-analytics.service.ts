import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

declare const gtag: any;
declare const gaId: string;

interface Cookies {
    [key: string]: string | undefined;
}

const ACCEPTED_COOKIES = 'acceptedCookiePolicy';

@Injectable()
export class GoogleAnalyticsService {
    private static readonly GOOGLE_ANALYTICS_SUPPORTED: boolean = typeof gtag !== 'undefined' && typeof gaId !== 'undefined';

    constructor(private location: Location) {
    }

    recordPageView(virtualPath?: string) {
        if (!GoogleAnalyticsService.GOOGLE_ANALYTICS_SUPPORTED) {
            return;
        }

        let path = this.location.path();
        if (virtualPath) {
            path = Location.joinWithSlash(path, virtualPath);
        }
        gtag('config', gaId, {'page_path': path});
    }

    sendEvent(eventName: string, eventCategory: string, eventLabel?: string): void {
        if (!GoogleAnalyticsService.GOOGLE_ANALYTICS_SUPPORTED) {
            return;
        }
        const eventParams: EventParams = {
            event_category: eventCategory
        };
        if (eventLabel) {
            eventParams.event_label = eventLabel;
        }

        gtag('event', eventName, eventParams);
    }

    setSessionDimension(name: string, index: number, value: any) {
        if (!GoogleAnalyticsService.GOOGLE_ANALYTICS_SUPPORTED) {
            return;
        }
        gtag('config', gaId, {
            'custom_map': { [`dimension${index}`]: name }
        });
        // Send an event with an arbitrary name because there is no real event to report. We just want to associate a
        // dimension with the user's whole session.
        gtag('event', `set_dimension_${name}`, { [name]: value });
    }

    get hasSetCookiePreference() {
        return GoogleAnalyticsService.cookies[ACCEPTED_COOKIES] !== undefined;
    }

    allowCookies() {
        GoogleAnalyticsService.setCookiePolicy(true);
        this.setEnabled(true);
        this.recordPageView();
    }

    rejectCookies() {
        GoogleAnalyticsService.setCookiePolicy(false);
        this.setEnabled(false);
    }

    setEnabled(enabled: boolean) {
        window["ga-disable-" + gaId] = !enabled;
    }

    private static setCookiePolicy(accepted: boolean): void {
        const d: Date = new Date();
        // Set the expiry for 1 year
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        const expiry: string = `expires=${d.toUTCString()}`;
        document.cookie = `${ACCEPTED_COOKIES}=${accepted}; ${expiry}`;
    }

    private static get cookies(): Cookies {
        return document.cookie.split('; ').reduce(
            (prev: Cookies, curr) => {
                const [key, value] = curr.split('=');
                prev[key] = value;
                return prev;
            },
            {}
        );
    }
}

interface EventParams {
    event_category: string;
    event_label?: string;
}
