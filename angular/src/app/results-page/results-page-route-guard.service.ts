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
        this.router.navigate(['/']);
        return false;
    }
}