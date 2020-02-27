import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ECOSelfReferralConsentData} from './eco-self-referral-consent-data';

@Injectable()
export class ECOSelfReferralConsentGuard implements CanActivate {

    constructor(private router: Router,
                private consentData: ECOSelfReferralConsentData) {
    }

    canActivate(): boolean {
        const hasGivenConsent = this.consentData.hasGivenStorageConsent && this.consentData.hasGivenSharingConsent;
        if (hasGivenConsent) {
            return true;
        } else {
            console.error('User has not given consent for ECO self-referral.');
            this.router.navigate(['/pages/energy-company-obligation']);
            return false;
        }
    }
}
