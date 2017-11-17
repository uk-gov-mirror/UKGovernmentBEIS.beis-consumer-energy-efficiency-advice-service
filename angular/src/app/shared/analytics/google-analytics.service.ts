import {Injectable} from "@angular/core";
import {Location} from '@angular/common';

declare const gtag: any;
declare const gaId: any;

@Injectable()
export class GoogleAnalyticsService {
    static readonly GOOGLE_ANALYTICS_SUPPORTED: boolean = typeof gtag !== 'undefined' && typeof gaId !== 'undefined';

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

    recordQuestionAnswer(questionId: string, answer: string) {
        if (GoogleAnalyticsService.GOOGLE_ANALYTICS_SUPPORTED) {
            gtag('event', questionId, {
                event_label: answer,
                event_category: 'question_answered'
            });
        }
    }
}