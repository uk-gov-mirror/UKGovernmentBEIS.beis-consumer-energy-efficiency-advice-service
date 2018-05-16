import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

declare const gtag: any;
declare const gaId: string;

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
}

interface EventParams {
    event_category: string;
    event_label?: string;
}
