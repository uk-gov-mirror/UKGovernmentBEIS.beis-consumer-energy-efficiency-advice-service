import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {isComplete, ResponseData} from "../shared/response-data/response-data";
import {HomeType} from "../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type";
import {HomeAge} from "../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age";
import {FuelType} from "../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type";

@Injectable()
export class ResultsPageRouteGuard implements CanActivate {

    constructor(private responseData: ResponseData,
                private router: Router) {
    }

    canActivate() {
        if (isComplete(this.responseData)) {
            return true;
        }
        // If the response data is not complete then we can't display the results page so we navigate to the home page
        this.router.navigate(['/']);
        return false;
    }
}