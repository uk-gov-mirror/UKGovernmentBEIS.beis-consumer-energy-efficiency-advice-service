import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {isComplete, ResponseData} from '../../shared/response-data/response-data';

@Injectable()
export class EnergyEfficiencyResultsRouteGuard implements CanActivate {

    constructor(private responseData: ResponseData,
                private router: Router) {
    }

    canActivate() {
        if (isComplete(this.responseData)) {
            return true;
        }

        // If the response data is not complete then we can't
        // display the results page so we navigate to the home page
        // TODO:BEISDEAS-201 display a user-visible error here
        console.error("Cannot show results; questions are incomplete")

        this.router.navigate(['/']);
        return false;
    }
}
