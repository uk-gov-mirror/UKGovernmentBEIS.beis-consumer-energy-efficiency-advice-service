import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordpressECOSupplier} from "../shared/wordpress-eco-suppliers-service/wordpress-eco-supplier";
import {WordpressECOSuppliersService} from "../shared/wordpress-eco-suppliers-service/wordpress-eco-suppliers.service";

/**
 * Page listing energy suppliers which have an Energy Company Obligation
 */
@Component({
    selector: 'app-eco-suppliers-page',
    templateUrl: './eco-suppliers-page.component.html',
    styleUrls: ['./eco-suppliers-page.component.scss']
})
export class ECOSuppliersPageComponent implements OnInit {

    suppliers$: Observable<WordpressECOSupplier[]>;

    constructor(private wordpressECOSuppliersService: WordpressECOSuppliersService) {}

    ngOnInit() {
        this.suppliers$ = this.wordpressECOSuppliersService.fetchAllECOSuppliers();
    }
}
