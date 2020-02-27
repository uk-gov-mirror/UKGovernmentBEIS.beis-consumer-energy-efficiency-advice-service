import { Injectable } from '@angular/core';

/**
 * This is a global mutable singleton which tracks the user's consent to store and share ECO self-referral details.
 *
 * Services which need to read or write this data can request that the singleton is injected.
 */
@Injectable()
export class ECOSelfReferralConsentData {
    public hasGivenStorageConsent: boolean = false;
    public hasGivenSharingConsent: boolean = false;

    public get hasGivenFullConsent() {
        return this.hasGivenSharingConsent && this.hasGivenStorageConsent;
    }

    reset() {
        this.hasGivenStorageConsent = false;
        this.hasGivenSharingConsent = false;
    }
}
