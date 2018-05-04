import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import Config from '../config';

@Injectable()
export class AdminPageGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate() {
        if (Config().hasAdminIpAddress) {
            return true;
        }
        // If the user does not have admin rights, we show the forbidden page
        this.router.navigate(['/forbidden'], {skipLocationChange: true});
        return false;
    }
}
