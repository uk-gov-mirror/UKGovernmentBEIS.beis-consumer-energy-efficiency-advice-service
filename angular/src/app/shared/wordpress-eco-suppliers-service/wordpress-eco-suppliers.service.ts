import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {RawWordpressECOSupplier, WordpressECOSupplier} from './wordpress-eco-supplier';

@Injectable()
export class WordpressECOSuppliersService {
    private static readonly ecoSuppliersEndpoint = 'acf/v3/eco-supplier';

    private suppliers: Observable<WordpressECOSupplier[]>;

    constructor(private wordpressApiService: WordpressApiService) {
    }

    fetchAllECOSuppliers(): Observable<WordpressECOSupplier[]> {
        if (!this.suppliers) {
            this.suppliers = this.wordpressApiService.getPosts<RawWordpressECOSupplier>(WordpressECOSuppliersService.ecoSuppliersEndpoint)
                .map(suppliers => suppliers
                    ? suppliers.map(supplier => new WordpressECOSupplier(supplier))
                    : null)
                .shareReplay(1);
        }
        return this.suppliers;
    }
}
