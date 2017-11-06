import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/map";
import groupBy from "lodash-es/groupBy";
import keys from "lodash-es/keys";
import orderBy from "lodash-es/orderBy";
import head from "lodash-es/head";

import {Epc} from "./model/epc";
import {EpcParserService} from "./epc-parser-service/epc-parser.service";
import {QuestionBaseComponent, slideInOutAnimation} from "../../../../base-question/question-base-component";
import {PostcodeEpc} from "./model/postcode-epc";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {FeatureFlagService} from "../../../../../shared/feature-flag/feature-flag.service";
import {EpcApiService} from "./epc-api-service/epc-api.service";
import {PostcodeApiService} from "./postcode-api-service/postcode-api.service";
import {PostcodeResponse} from "./model/response/postcode/postcode-response";
import {PostcodeErrorResponse} from "./model/response/postcode/postcode-error-response";
import {PostcodeValidationService} from "../../../../../shared/postcode-validation-service/postcode-validation.service";
import {PageStateService} from "../../../../../shared/page-state-service/page-state.service";

@Component({
    selector: 'app-postcode-epc-question',
    templateUrl: './postcode-epc-question.component.html',
    styleUrls: ['./postcode-epc-question.component.scss'],
    providers: [EpcApiService, PostcodeApiService],
    animations: [slideInOutAnimation]
})
export class PostcodeEpcQuestionComponent extends QuestionBaseComponent implements OnInit {
    static readonly ERROR_VALIDATION: string = 'Please enter a full valid UK postcode';

    postcodeInput: string;
    shouldDisplayLoadingSpinner: boolean;
    isNoEpcSelected: boolean;
    validationError: string;

    allEpcsForPostcode: Epc[];
    selectedEpc: Epc;

    constructor(responseData: ResponseData,
                private epcApiService: EpcApiService,
                private postcodeApiService: PostcodeApiService,
                private featureFlagService: FeatureFlagService,
                private postcodeValidationService: PostcodeValidationService,
                private pageStateService: PageStateService
    ) {
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

        if (!this.postcodeValidationService.isValid(this.postcodeInput)) {
            this.displayPostcodeValidationError();
        } else {
            this.checkFeatureFlagAndLookupAllEpcsForPostcode();
        }
    }

    displayPostcodeValidationError(): void {
        this.resetSearchState();
        this.validationError = PostcodeEpcQuestionComponent.ERROR_VALIDATION;
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
        this.validationError = null;
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
                data => this.epcSearchCompleted(data),
                err => this.lookupBasicPostcodeDetails()
            );
    }

    epcSearchCompleted(epcs: Epc[]): void {
        if (!epcs || epcs.length === 0) {
            this.lookupBasicPostcodeDetails();
        }
        this.shouldDisplayLoadingSpinner = false;
        const epcsByAddress: {[address: string]: Epc[]} = groupBy(epcs, epc => epc.getDisplayAddress());
        const mostRecentEpcForEachAddress = keys(epcsByAddress)
            .map(address => {
                const allEpcsForPostcodeSortedByDate = orderBy(epcsByAddress[address], ['epcDate'], ['desc']);
                return head(allEpcsForPostcodeSortedByDate)
            });
        this.allEpcsForPostcode = mostRecentEpcForEachAddress;
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
        this.pageStateService.showGenericErrorAndLogMessage(err);
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
