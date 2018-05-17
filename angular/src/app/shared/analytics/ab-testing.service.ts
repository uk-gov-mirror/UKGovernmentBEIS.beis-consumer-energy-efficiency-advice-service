import {Injectable} from '@angular/core';
import {GoogleAnalyticsService} from './google-analytics.service';

export enum AbTestingGroup {
    A,
    B,
}

@Injectable()
export class AbTestingService {
    private localStorageKey = 'ab_test_bucket';
    private googleAnalyticsName = 'ab_test';
    private group: AbTestingGroup;

    constructor(private googleAnalyticsService: GoogleAnalyticsService) {
    }

    isInGroupA() {
        return this.getGroup() === AbTestingGroup.A;
    }

    getGroup(): AbTestingGroup {
        if (this.group !== undefined) {
            return this.group;
        }

        if (localStorageAvailable()) {
            this.group = AbTestingGroup[localStorage.getItem(this.localStorageKey)];

            if (this.group === undefined) {
                this.group = Math.random() < 0.5 ? AbTestingGroup.A : AbTestingGroup.B;
                localStorage.setItem(this.localStorageKey, AbTestingGroup[this.group]);
            }
        } else {
            this.group = AbTestingGroup.A;
        }

        this.googleAnalyticsService.setSessionDimension(this.googleAnalyticsName, 2, AbTestingGroup[this.group]);

        return this.group;
    }
}

// Simplified version of
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
function localStorageAvailable() {
    try {
        const x = '__storage_test__';
        localStorage.setItem(x, x);
        localStorage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}
