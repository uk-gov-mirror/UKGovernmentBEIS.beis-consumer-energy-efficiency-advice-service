import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {InstallerSearchService} from "../shared/installer-search-service/installer-search.service";
import sortBy from 'lodash-es/sortBy';
import {PageTitleService} from "../shared/page-title-service/page-title.service";
import {Installer} from "../shared/installer-search-service/installer-response";
import {PostcodeEpcService} from "../shared/postcode-epc-service/postcode-epc.service";

/**
 * Certain measures have the same headline and TrustMark trade code, but different measure codes.
 * To avoid these creating duplicate options in the dropdown, we map any with shared fields onto a single option.
 * The options that have been mapped are then filtered out by the dropdown.
 */

const MEASURE_CODE_OVERRIDES = {
    Q1: 'Q2',
    Q: 'Q2'
};

@Component({
    selector: 'app-installer-search',
    templateUrl: './installer-search.component.html',
    styleUrls: ['./installer-search.component.scss']
})
export class InstallerSearchComponent implements OnInit {
    postcode = null;
    formPostcode = null;
    selectedMeasure = null;
    formSelectedMeasure = null;
    measures = [];
    installers: Installer[] = [];
    searchHasBeenPerformed = false;
    loading = false;
    errorMessage = null;
    selectedInstallerId = null;
    hoveredInstallerCardId = null;
    getUserLatLngUnsuccessful = false;

    constructor(private route: ActivatedRoute,
                private responseData: ResponseData,
                private measureContentService: EnergySavingMeasureContentService,
                private installerSearchService: InstallerSearchService,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.pageTitle.set('Find an installer');
        this.formPostcode = this.responseData.postcode && this.responseData.postcode.toUpperCase();
        this.route.params.subscribe(params => {
                this.measureContentService.fetchMeasureDetails().subscribe(measures => {
                    this.measures = sortBy(
                        measures.filter(measure => (
                            measure.acf.trustmark_trade_codes
                            && !Object.keys(MEASURE_CODE_OVERRIDES).includes(measure.acf.measure_code))
                        ),
                        [m => m.acf.headline.toUpperCase()]);

                    if (params["measure-code"]) {
                        const chosenMeasureCode = MEASURE_CODE_OVERRIDES[params['measure-code']] || params['measure-code'];
                        const chosenMeasure = (measures.filter(measure => chosenMeasureCode === measure.acf.measure_code))[0];
                        if (chosenMeasure) {
                            this.formSelectedMeasure = chosenMeasure;
                        }
                    }
                    if (params["postcode"]) {
                        this.formPostcode = this.addWhitespaceToPostcodeIfNone(params["postcode"]);
                    }
                    if (this.formSelectedMeasure && this.formPostcode) {
                        this.updateSearchParametersWithFormValues();
                        this.loadInstallers();
                    }
                });
            }
        );
    }

    updateSearchParametersWithFormValues() {
        this.getUserLatLngUnsuccessful = false;
        this.postcode = this.addWhitespaceToPostcodeIfNone(this.formPostcode);
        this.selectedMeasure = this.formSelectedMeasure;
    }

    loadInstallers() {
        if (this.selectedMeasure && this.postcode && this.isValidPostcode()) {
            this.overwriteFormParametersWithLastSearchedValues();
            this.selectedInstallerId = null;
            this.errorMessage = null;
            this.loading = true;
            this.fetchInstallers();
        } else {
            this.buildInvalidSearchErrorMessage();
        }
    }

    overwriteFormParametersWithLastSearchedValues() {
        this.formSelectedMeasure = this.selectedMeasure;
        this.formPostcode = this.postcode;
    }

    fetchInstallers() {
        if (this.selectedMeasure && this.selectedMeasure.acf && this.selectedMeasure.acf.trustmark_trade_codes) {
            this.installerSearchService
                .fetchInstallerDetails(this.postcode, this.tradeCodes)
                .subscribe(response => {
                    this.installers = response.data;
                    this.loading = false;
                    this.searchHasBeenPerformed = true;
                }, error => {
                    this.errorMessage = "Sorry, something went wrong. Please try again or come back later.";
                });
        } else {
            this.errorMessage = "Sorry, that measure isn't valid. Please try another.";
        }
    }

    buildInvalidSearchErrorMessage() {
        const messageParts = [];
        if (!this.postcode || !this.isValidPostcode()) {
            // Matches the message from the API if postcode is invalid.
            messageParts.push('No valid postcode supplied.');
        }
        if (!this.selectedMeasure) {
            messageParts.push('No measure selected.');
        }
        this.errorMessage = messageParts.join(' ');
    }

    onMarkerClick(installerId: number) {
        this.selectedInstallerId = installerId;
        this.showInstallerCardWithId('installer-card-' + this.selectedInstallerId);
    }

    onGetUserLatLngUnsuccessful() {
        this.getUserLatLngUnsuccessful = true;
    }

    showInstallerCardWithId(id: string) {
        const selectedInstallerCard = document.getElementById(id);
        this.scrollElementIntoView(selectedInstallerCard);
    }

    scrollElementIntoView(element: HTMLElement) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    onInstallerCardMouseEnter(installerId: number) {
        this.hoveredInstallerCardId = installerId;
    }

    onInstallerCardMouseLeave() {
        this.hoveredInstallerCardId = null;
    }

    isValidPostcode() {
        return PostcodeEpcService.isValidPostcode(this.postcode);
    }

    /* According to https://ideal-postcodes.co.uk/guides/uk-postcode-format
     the second half of the postcode is always 3 characters long.
     We can thus easily find the split between sections and add the whitespace character there.*/
    addWhitespaceToPostcodeIfNone(postcode: String) {
        if (postcode && postcode.length >= 5 && postcode.charAt(postcode.length - 4) !== ' ') {
            return postcode.slice(0, -3) + ' ' + postcode.slice(-3);
        } else {
            return postcode;
        }
    }

    get trustmarkLinkUrl() {
        return InstallerSearchService.getTrustmarkInstallerListUrl(this.postcode, this.tradeCodes);
    }

    get tradeCodes() {
        return this.selectedMeasure.acf.trustmark_trade_codes.map(t => t.trade_code);
    }
}
