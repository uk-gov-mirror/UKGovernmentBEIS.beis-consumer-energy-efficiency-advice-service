import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {isComplete, ResponseData} from "../common/response-data/response-data";

@Injectable()
export class ResultsPageRouteGuard implements CanActivate {

    constructor(private responseData: ResponseData,
                private router: Router) {
    }

    canActivate() {
        if (isComplete(this.responseData)) {
            return true;
        }
        // If the response data is not complete then we can't display the results page so we navigate to the questionnaire first
        this.router.navigate(['/questionnaire/home-basics']);
        return false;
    }
}