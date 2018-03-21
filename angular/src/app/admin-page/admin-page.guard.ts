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
        // If the user does not have admin rights, we navigate to the home page
        this.router.navigate(['/']);
        return false;
    }
}
