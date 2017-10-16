import {Component} from '@angular/core';
import {PostcodeEpcService} from './api-service/postcode-epc.service';
import {Epc} from './model/epc';
import {EpcParserService} from './epc-parser-service/epc-parser.service';
import {QuestionBaseComponent, slideInOutAnimation} from '../question.component';
import {PostcodeEpc} from './model/postcode-epc';

@Component({
    selector: 'app-postcode-epc-question',
    templateUrl: './postcode-epc-question.component.html',
    styleUrls: ['./postcode-epc-question.component.scss'],
    providers: [PostcodeEpcService],
    animations: [slideInOutAnimation]
})
export class PostcodeEpcQuestionComponent extends QuestionBaseComponent<PostcodeEpc> {
    static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
    static readonly ERROR_VALIDATION: Error = {
        heading: null,
        message: 'Please enter a full valid UK postcode'
    };
    static readonly ERROR_NO_EPCS: Error = {
        heading: null,
        message: 'We can\'t find basic energy efficiency details for any addresses at this postcode'
    };
    static readonly ERROR_EPC_API_FAILURE: Error = {
        heading: 'Something went wrong',
        message: 'We can\'t fetch basic details about energy efficiency at your property right now. Please try again later.'
    };

    postcodeInput: string;
    shouldDisplayLoadingSpinner: boolean;
    isNoEpcSelected: boolean;

    error: Error;

    allEpcsForPostcode: Epc[];
    selectedEpc: Epc;

    constructor(private postcodeEpcService: PostcodeEpcService) {
        super();
    }

    ngOnInit() {
        this.populateFormFromSavedData();
    }

    populateFormFromSavedData(): void {
        this.postcodeInput = this.response.postcode;
        this.allEpcsForPostcode = this.response.epc ? [this.response.epc] : null;
        this.selectedEpc = this.response.epc;
    }

    handlePostcodeEntered(): void {
        this.resetSearchState();
        let isPostcodeInputValid = PostcodeEpcQuestionComponent.POSTCODE_REGEXP.test(this.postcodeInput);
        if (!isPostcodeInputValid) {
            this.error = PostcodeEpcQuestionComponent.ERROR_VALIDATION;
            return;
        }
        this.lookupAllEpcsForPostcode();
    }

    resetSearchState(): void {
        this.allEpcsForPostcode = [];
        this.shouldDisplayLoadingSpinner = false;
        this.error = null;
        this.isNoEpcSelected = false;
        this.selectedEpc = null;
    }

    lookupAllEpcsForPostcode(): void {
        this.shouldDisplayLoadingSpinner = true;
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
            this.error = PostcodeEpcQuestionComponent.ERROR_NO_EPCS;
            this.continueWithoutEpc();
            return;
        }
    }

    handleEpcApiError(): void {
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
    }

    continueWithoutEpc(): void {
        this.isNoEpcSelected = true;
        this.selectedEpc = null;
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
