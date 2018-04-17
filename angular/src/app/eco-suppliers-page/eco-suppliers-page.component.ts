import {Component, OnInit} from '@angular/core';
import {error} from "loglevel";
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
    loading = true;
    error = false;

    suppliers: WordpressECOSupplier[];

    constructor(private wordpressECOSuppliersService: WordpressECOSuppliersService) {}

    ngOnInit() {
        this.wordpressECOSuppliersService.fetchAllECOSuppliers()
            .map(suppliers => suppliers.sort((a, b) => a.name.localeCompare(b.name)))
            .subscribe(
                suppliers => this.suppliers = suppliers,
                err => this.handleError(err),
                () => this.loading = false,
            );
    }

    private handleError(err) {
        error(err);
        this.error = true;
        this.loading = false;
    }
}
