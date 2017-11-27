import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ResponseData} from "../../shared/response-data/response-data";

@Injectable()
export class YourPlanPageGuard implements CanActivate {

    constructor(private router: Router,
                private responseData: ResponseData) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAnyRecommendationInPlan = this.responseData.energyEfficiencyRecommendationsInPlan.length > 0;
        if (isAnyRecommendationInPlan) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}