import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/map";

import {Epc} from "./model/epc";
import {EpcParserService} from "./epc-parser-service/epc-parser.service";
import {QuestionBaseComponent, slideInOutAnimation} from "../../../../base-question/question-base-component";
import {PostcodeEpc} from "./model/postcode-epc";
import {ResponseData} from "../../../../../common/response-data/response-data";
import {FeatureFlagService} from "../../../../../common/feature-flag/feature-flag.service";
import {EpcApiService} from "./epc-api-service/epc-api.service";
import {PostcodeApiService} from "./postcode-api-service/postcode-api.service";
import {PostcodeResponse} from "./model/response/postcode/postcode-response";
import {PostcodeErrorResponse} from "./model/response/postcode/postcode-error-response";

@Component({
    selector: 'app-postcode-epc-question',
    templateUrl: './postcode-epc-question.component.html',
    styleUrls: ['./postcode-epc-question.component.scss'],
    providers: [EpcApiService, PostcodeApiService],
    animations: [slideInOutAnimation]
})
export class PostcodeEpcQuestionComponent extends QuestionBaseComponent<PostcodeEpc> implements OnInit {
    static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
    static readonly ERROR_VALIDATION: Error = {
        heading: null,
        message: 'Please enter a full valid UK postcode'
    };

    postcodeInput: string;
    shouldDisplayLoadingSpinner: boolean;
    isNoEpcSelected: boolean;

    error: Error;

    allEpcsForPostcode: Epc[];
    selectedEpc: Epc;

    constructor(responseData: ResponseData,
                private epcApiService: EpcApiService,
                private postcodeApiService: PostcodeApiService,
                private featureFlagService: FeatureFlagService) {
        super(responseData);
    }

    ngOnInit() {
        this.populateFormFromSavedData();
    }

    get response(): PostcodeEpc {
        const postcodeEpc = {
            epc: this.responseData.epc,
            postcode: this.responseData.postcode,
            localAuthorityCode: this.responseData.localAuthorityCode
        };
        return this.responseData.postcode && postcodeEpc;
    }

    set response(val: PostcodeEpc) {
        this.responseData.postcode = val.postcode;
        this.responseData.epc = val.epc;
        this.responseData.localAuthorityCode = val.localAuthorityCode;
    }

    populateFormFromSavedData(): void {
        this.postcodeInput = this.response && this.response.postcode;
        this.allEpcsForPostcode = (this.response && this.response.epc) ? [this.response.epc] : null;
        this.selectedEpc = this.response && this.response.epc;
    }

    handlePostcodeEntered(): void {
        this.trimLeadingOrTrailingSpacesFromPostcodeString();
        this.resetSearchState();
        let isPostcodeInputValid = PostcodeEpcQuestionComponent.POSTCODE_REGEXP.test(this.postcodeInput);
        if (!isPostcodeInputValid) {
            this.displayPostcodeValidationError();
            return;
        }
        this.checkFeatureFlagAndLookupAllEpcsForPostcode();
    }

    displayPostcodeValidationError(): void {
        this.resetSearchState();
        this.error = PostcodeEpcQuestionComponent.ERROR_VALIDATION;
    }

    trimLeadingOrTrailingSpacesFromPostcodeString(): void {
        const matchLeadingSpaces = /^\s+/;
        const matchTrailingSpaces = /\s+$/;
        this.postcodeInput = this.postcodeInput
            .replace(matchLeadingSpaces, '')
            .replace(matchTrailingSpaces, '');
    }

    resetSearchState(): void {
        this.allEpcsForPostcode = [];
        this.shouldDisplayLoadingSpinner = false;
        this.error = null;
        this.isNoEpcSelected = false;
        this.selectedEpc = null;
    }

    checkFeatureFlagAndLookupAllEpcsForPostcode(): void {
        this.shouldDisplayLoadingSpinner = true;
        this.featureFlagService.fetchFeatureFlags().subscribe(flags => {
            if (flags.fetch_epc_data) {
                this.lookupAllEpcsForPostcode();
            } else {
                this.lookupBasicPostcodeDetails();
            }
        });
    }

    lookupAllEpcsForPostcode(): void {
        this.epcApiService.getEpcData(this.postcodeInput)
            .map(result => EpcParserService.parse(result))
            .subscribe(
                data => this.searchCompleted(data),
                err => this.lookupBasicPostcodeDetails()
            );
    }

    searchCompleted(epcs: Epc[]): void {
        this.shouldDisplayLoadingSpinner = false;
        this.allEpcsForPostcode = epcs;
        if (!epcs || epcs.length === 0) {
            this.lookupBasicPostcodeDetails();
        }
    }

    isSelected(epc: Epc): boolean {
        return epc === this.selectedEpc;
    }

    continueWithEpc(epc: Epc): void {
        this.selectedEpc = epc;
        this.isNoEpcSelected = false;
        this.response = {
            epc: epc,
            postcode: this.postcodeInput,
            localAuthorityCode: epc.localAuthorityCode
        };
        this.complete.emit();
    }

    lookupBasicPostcodeDetails() {
        this.resetSearchState();
        this.shouldDisplayLoadingSpinner = true;
        this.postcodeApiService.getPostcodeDetails(this.postcodeInput)
            .subscribe(
                response => this.handlePostcodeApiResponse(response),
                err => this.handlePostcodeApiError(err)
            );
    }

    handlePostcodeApiResponse(response: PostcodeResponse) {
        this.continueWithoutEpcWithLocalAuthorityCode(response.result.codes.admin_district);
    }

    handlePostcodeApiError(err: PostcodeErrorResponse) {
        const isPostcodeNotFoundResponse: boolean = err.status && err.error &&
            err.status === PostcodeApiService.postcodeNotFoundStatus &&
            err.error.includes(PostcodeApiService.postcodeNotFoundMessage);
        if (isPostcodeNotFoundResponse) {
            this.displayPostcodeValidationError();
            return;
        }
        this.continueWithoutEpcWithLocalAuthorityCode(null);
    }

    continueWithoutEpcWithLocalAuthorityCode(localAuthorityCode: string) {
        this.response = {
            epc: null,
            postcode: this.postcodeInput,
            localAuthorityCode: localAuthorityCode
        };
        this.complete.emit();
    }
}

interface Error {
    heading: string;
    message: string;
}
