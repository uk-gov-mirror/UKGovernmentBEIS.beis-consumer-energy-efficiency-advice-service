import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResponseData} from '../response-data/response-data';
import {Observable} from 'rxjs/Observable';
import {PostcodeApiService} from '../postcode-epc-service/postcode-api-service/postcode-api.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeBasicDetailsResponse} from '../postcode-epc-service/model/response/postcode-basic-details-response';

@Component({
    selector: 'app-postcode-lookup',
    templateUrl: './postcode-lookup.component.html',
    styleUrls: ['./postcode-lookup.component.scss']
})
export class PostcodeLookupComponent implements OnInit {

    postcodeInput: string;
    loading: boolean = false;
    validationError: boolean = false;
    scottishPostcode: boolean = false;

    @Output() postcodeSelected: EventEmitter<void> = new EventEmitter<void>();

    constructor(private responseData: ResponseData,
                private postcodeApiService: PostcodeApiService) {
    }

    ngOnInit(): void {
        this.postcodeInput = this.responseData.postcode;
    }

    onPostcodeSubmit() {
        if (!this.postcodeInput) {
            return;
        }

        this.loading = true;
        this.scottishPostcode = false;
        this.validationError = false;
        this.fetchPostcodeDetails(this.postcodeInput.replace(/\s/g, ''))
            .subscribe(
                postcodeDetails => {
                    this.scottishPostcode = postcodeDetails.result.country === 'Scotland';

                    if (this.scottishPostcode) {
                        this.handleSearchError(null);
                        return;
                    }

                    this.responseData.postcode = postcodeDetails.result.postcode.replace(/\s/g, '');
                    this.responseData.localAuthorityCode = postcodeDetails.result.codes.admin_district;
                    this.postcodeSelected.emit();
                    this.loading = false;
                },
                error => this.handleSearchError(error)
            );
    }

    private fetchPostcodeDetails(postcode: string): Observable<PostcodeBasicDetailsResponse> {
        return this.postcodeApiService.fetchBasicPostcodeDetails(postcode)
            .catch(() => {
                if (!PostcodeEpcService.isValidPostcode(postcode)) {
                    return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
                }
                return Observable.throw(`Error when fetching details for postcode "${ postcode }"`);
            });
    }

    private handleSearchError(error: any): void {
        this.responseData.postcode = null;
        this.responseData.localAuthorityCode = null;

        this.loading = false;

        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            this.validationError = true;
            return;
        }
        this.postcodeSelected.emit();
    }
}
