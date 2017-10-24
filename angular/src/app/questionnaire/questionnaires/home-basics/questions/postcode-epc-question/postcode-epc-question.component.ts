import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';

import {PostcodeEpcService} from './api-service/postcode-epc.service';
import {Epc} from './model/epc';
import {EpcParserService} from './epc-parser-service/epc-parser.service';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../../base-question/question-base-component';
import {PostcodeEpc} from './model/postcode-epc';
import {ResponseData} from "../../../../../common/response-data/response-data";
import {FeatureFlagService} from "../../../../../common/feature-flag/feature-flag.service";

@Component({
    selector: 'app-postcode-epc-question',
    templateUrl: './postcode-epc-question.component.html',
    styleUrls: ['./postcode-epc-question.component.scss'],
    providers: [PostcodeEpcService],
    animations: [slideInOutAnimation]
})
export class PostcodeEpcQuestionComponent extends QuestionBaseComponent<PostcodeEpc> implements OnInit {
    static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
    static readonly ERROR_VALIDATION: Error = {
        heading: null,
        message: 'Please enter a full valid UK postcode'
    };
    static readonly ERROR_EPC_API_FAILURE: Error = {
        heading: 'Something went wrong',
        message: 'We can\'t fetch basic details about energy efficiency at your property right now.\n' +
        'Please try again later, or continue to the next question to tell us some more about your property.'
    };

    postcodeInput: string;
    shouldDisplayLoadingSpinner: boolean;
    isNoEpcSelected: boolean;

    error: Error;

    allEpcsForPostcode: Epc[];
    selectedEpc: Epc;

    constructor(responseData: ResponseData,
                private postcodeEpcService: PostcodeEpcService,
                private featureFlagService: FeatureFlagService) {
        super(responseData);
    }

    ngOnInit() {
        this.populateFormFromSavedData();
    }

    get response(): PostcodeEpc {
        const postcodeEpc = {
            epc: this.responseData.epc,
            postcode: this.responseData.postcode
        };
        return this.responseData.postcode && postcodeEpc;
    }

    set response(val: PostcodeEpc) {
        this.responseData.postcode = val.postcode;
        this.responseData.epc = val.epc;
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
            this.error = PostcodeEpcQuestionComponent.ERROR_VALIDATION;
            return;
        }
        this.checkFeatureFlagAndLookupAllEpcsForPostcode();
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
                this.shouldDisplayLoadingSpinner = false;
                this.continueWithoutEpc();
            }
        });
    }

    lookupAllEpcsForPostcode(): void {
        this.postcodeEpcService.getEpcData(this.postcodeInput)
            .map(result => EpcParserService.parse(result))
            .subscribe(
                data => this.searchCompleted(data),
                err => this.handleEpcApiError()
            );
    }

    searchCompleted(epcs: Epc[]): void {
        this.shouldDisplayLoadingSpinner = false;
        this.allEpcsForPostcode = epcs;
        if (!epcs || epcs.length === 0) {
            this.continueWithoutEpc();
        }
    }

    handleEpcApiError(): void {
        this.setResponsePostcodeFromInput();
        this.shouldDisplayLoadingSpinner = false;
        this.error = PostcodeEpcQuestionComponent.ERROR_EPC_API_FAILURE;
    }

    isSelected(epc: Epc): boolean {
        return epc === this.selectedEpc;
    }

    continueWithEpc(epc: Epc): void {
        this.selectedEpc = epc;
        this.isNoEpcSelected = false;
        this.response = {
            epc: epc,
            postcode: this.postcodeInput
        };
        this.complete.emit();
    }

    continueWithoutEpc(): void {
        this.isNoEpcSelected = true;
        this.selectedEpc = null;
        this.setResponsePostcodeFromInput();
        this.complete.emit();
    }

    setResponsePostcodeFromInput(): void {
        this.response = {
            epc: null,
            postcode: this.postcodeInput
        };
    }
}

interface Error {
    heading: string;
    message: string;
}
