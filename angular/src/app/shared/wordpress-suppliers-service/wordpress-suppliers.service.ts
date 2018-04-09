import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {RawWordpressSupplier, WordpressSupplier} from './wordpress-supplier';

@Injectable()
export class WordpressSuppliersService {
    private static readonly suppliersEndpoint = 'acf/v3/supplier';

    private suppliers: Observable<WordpressSupplier[]>;

    constructor(private wordpressApiService: WordpressApiService) {
    }

    fetchAllSuppliers(): Observable<WordpressSupplier[]> {
        if (!this.suppliers) {
            this.suppliers = this.wordpressApiService.getPosts<RawWordpressSupplier>(WordpressSuppliersService.suppliersEndpoint)
                .map(suppliers => suppliers
                    ? suppliers.map(supplier => new WordpressSupplier(supplier))
                    : null)
                .shareReplay(1);
        }
        return this.suppliers;
    }
}
