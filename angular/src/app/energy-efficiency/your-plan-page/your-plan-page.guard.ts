import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';

@Injectable()
export class YourPlanPageGuard implements CanActivate {

    constructor(private router: Router,
                private recommendationsService: RecommendationsService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAnyRecommendationInPlan = this.recommendationsService.getRecommendationsInPlan().length > 0;
        if (isAnyRecommendationInPlan) {
            return true;
        }

        // TODO:BEISDEAS-201 display a user-visible error here
        console.error("Cannot show plan; no data")

        this.router.navigate(['/']);
        return false;
    }
}
