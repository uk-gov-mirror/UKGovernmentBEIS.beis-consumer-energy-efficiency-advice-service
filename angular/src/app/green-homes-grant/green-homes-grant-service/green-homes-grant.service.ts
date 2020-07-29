import {Injectable} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import {GreenHomesGrantEligibility} from "./green-homes-grant-eligibility";

@Injectable()
export class GreenHomesGrantService {

    private cachedResponseData: ResponseData;
    private _eligibility: Observable<GreenHomesGrantEligibility>;

    constructor(private responseData: ResponseData) {
    }

    public getEligibility(): Observable<GreenHomesGrantEligibility> {
        if (!isEqual(this.responseData, this.cachedResponseData) || !this._eligibility) {
            this.cachedResponseData = clone(this.responseData);
            this._eligibility = this.fetchEligibility().shareReplay(1);
        }
        return this._eligibility;
    }

    // TODO SEA-36: Implement actual eligibility check
    private fetchEligibility(): Observable<GreenHomesGrantEligibility> {
        return Observable.of(GreenHomesGrantEligibility.LikelyEligible);
    }
}
