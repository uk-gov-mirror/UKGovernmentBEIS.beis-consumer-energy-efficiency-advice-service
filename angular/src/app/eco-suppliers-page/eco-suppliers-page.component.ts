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
        // The suppliers are stored in the database in the order that they appear here:
        // https://www.ofgem.gov.uk/environmental-programmes/eco/contacts-guidance-and-resources/supplier-contact-details
        // Wordpress returns them in the opposite order, so we reverse them here
        this.suppliers$ = this.wordpressECOSuppliersService.fetchAllECOSuppliers()
            .map(suppliers => suppliers.reverse());
    }
}
