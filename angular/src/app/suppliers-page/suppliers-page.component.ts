import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordpressSupplier} from "../shared/wordpress-suppliers-service/wordpress-supplier";
import {WordpressSuppliersService} from "../shared/wordpress-suppliers-service/wordpress-suppliers.service";

@Component({
    selector: 'app-suppliers-page',
    templateUrl: './suppliers-page.component.html',
    styleUrls: ['./suppliers-page.component.scss']
})
export class SuppliersPageComponent implements OnInit {

    suppliers$: Observable<WordpressSupplier[]>;

    constructor(private wordpressSuppliersService: WordpressSuppliersService) {}

    ngOnInit() {
        this.suppliers$ = this.wordpressSuppliersService.fetchAllSuppliers();
    }
}
