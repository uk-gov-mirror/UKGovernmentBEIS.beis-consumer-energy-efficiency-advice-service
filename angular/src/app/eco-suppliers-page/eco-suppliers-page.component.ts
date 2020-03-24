import {Component, OnInit} from '@angular/core';
import {error} from "loglevel";
import {WordpressECOSupplier} from "../shared/wordpress-eco-suppliers-service/wordpress-eco-supplier";
import {WordpressECOSuppliersService} from "../shared/wordpress-eco-suppliers-service/wordpress-eco-suppliers.service";
import {isComplete, ResponseData} from "../shared/response-data/response-data";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

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
    errorMessage: string = "Something went wrong and we can't load this list of suppliers right now. Please try again later";
    hasCompletedQuestionnaire = false;

    suppliers: WordpressECOSupplier[];

    constructor(private wordpressECOSuppliersService: WordpressECOSuppliersService,
                private responseData: ResponseData,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.pageTitle.set('ECO Suppliers');
        this.wordpressECOSuppliersService.fetchAllECOSuppliers()
            .map(suppliers => suppliers.sort((a, b) => a.name.localeCompare(b.name)))
            .subscribe(
                suppliers => this.suppliers = suppliers,
                err => this.handleError(err),
                () => this.loading = false,
            );
        this.hasCompletedQuestionnaire = isComplete(this.responseData);
    }

    private handleError(err) {
        error(err);
        this.error = true;
        this.loading = false;
    }
}
