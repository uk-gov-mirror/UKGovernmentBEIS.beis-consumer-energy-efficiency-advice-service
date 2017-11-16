import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/map";

import {Epc} from "../../../shared/postcode-epc-service/model/epc";
import {EpcParserService} from "../../../shared/postcode-epc-service/epc-api-service/epc-parser.service";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {EpcApiService} from "../../../shared/postcode-epc-service/epc-api-service/epc-api.service";
import {PostcodeApiService} from "../../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {PostcodeEpcService} from "../../../shared/postcode-epc-service/postcode-epc.service";
import {PostcodeDetails} from "../../../shared/postcode-epc-service/model/postcode-details";

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
                private postcodeEpcService: PostcodeEpcService) {
        super(responseData);
    }

    ngOnInit() {
        this.populateFormFromSavedData();
    }

    get postcode(): string {
        return this.responseData.postcode;
    }

    set postcode(val: string) {
        this.responseData.postcode = val;
    }

    get epc(): Epc {
        return this.responseData.epc;
    }

    set epc(val: Epc) {
        this.responseData.epc = val;
    }

    get localAuthorityCode(): string {
        return this.responseData.localAuthorityCode;
    }

    set localAuthorityCode(val: string) {
        this.responseData.localAuthorityCode = val;
    }

    populateFormFromSavedData(): void {
        this.postcodeInput = this.postcode;
        this.selectedEpc = this.epc;
    }

    handlePostcodeEntered(): void {
        this.postcodeInput = this.postcodeInput.replace(/\s/g, '');
        this.resetSearchState();
        this.shouldDisplayLoadingSpinner = true;
        this.postcodeEpcService.fetchPostcodeDetails(this.postcodeInput)
            .subscribe(
                postcodeDetails => this.handlePostcodeDetails(postcodeDetails),
                error => this.handlePostcodeSearchError(error)
            );
    }

    private displayPostcodeValidationError(): void {
        this.resetSearchState();
        this.validationError = PostcodeEpcQuestionComponent.ERROR_VALIDATION;
    }

    private resetSearchState(): void {
        this.allEpcsForPostcode = [];
        this.shouldDisplayLoadingSpinner = false;
        this.validationError = null;
    }

    private handlePostcodeDetails(postcodeDetails: PostcodeDetails): void {
        this.localAuthorityCode = postcodeDetails.localAuthorityCode;
        this.postcode = postcodeDetails.postcode;
        const epcs = postcodeDetails.allEpcsForPostcode;
        if (!epcs || epcs.length == 0) {
            return this.continueWithoutEpc();
        }
        this.shouldDisplayLoadingSpinner = false;
        this.allEpcsForPostcode = epcs.sort(EpcParserService.sortEpcsByHouseNumberOrAlphabetically);
    }

    private handlePostcodeSearchError(error: any): void {
        if (error === PostcodeEpcService.POSTCODE_NOT_FOUND) {
            return this.displayPostcodeValidationError();
        }
        console.error(error);
        this.postcode = this.postcodeInput;
        this.localAuthorityCode = null;
        this.continueWithoutEpc();
    }

    isSelected(epc: Epc): boolean {
        return this.selectedEpc && epc.certificateHash === this.selectedEpc.certificateHash;
    }

    continueWithEpc(epc: Epc): void {
        this.selectedEpc = epc;
        this.isNoEpcSelected = false;
        this.epc = epc;
        this.complete.emit();
    }

    continueWithoutEpc(): void {
        this.selectedEpc = null;
        this.isNoEpcSelected = true;
        this.epc = null;
        this.complete.emit();
    }
}
