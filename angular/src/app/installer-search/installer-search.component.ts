import {Component, Directive, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {InstallerSearchService} from "./installer-search-service/installer-search.service";
import sortBy from 'lodash-es/sortBy';
import {PageTitleService} from "../shared/page-title-service/page-title.service";
import {Installer, InstallerPaginator} from "./installer-search-service/installer-response";
import {PostcodeEpcService} from "../shared/postcode-epc-service/postcode-epc.service";

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
    paginator: InstallerPaginator;
    installers: Installer[] = [];
    searchHasBeenPerformed = false;
    loading = false;
    errorMessage = null;
    selectedInstallerId = null;
    hoveredInstallerCardId = null;

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
                    this.measures = sortBy(measures.filter(measure => measure.acf.trustmark_trade_codes),
                        [m => m.acf.headline.toUpperCase()]);
                    if (params["measure-code"]) {
                        const chosenMeasure = (measures.filter(measure => params["measure-code"] === measure.acf.measure_code))[0];
                        if (chosenMeasure) {
                            this.formSelectedMeasure = chosenMeasure;
                        }
                    }
                });
            }
        );
    }

    updateSearchParametersWithFormValues() {
        this.postcode = this.formPostcode;
        this.selectedMeasure = this.formSelectedMeasure;
    }

    loadFirstPageOfInstallers() {
        if (this.selectedMeasure && this.postcode && this.isValidPostcode()) {
            this.selectedInstallerId = null;
            this.errorMessage = null;
            this.loading = true;
            this.fetchSpecificPageOfInstallers(1);
        } else {
            this.buildInvalidSearchErrorMessage();
        }
    }

    loadNextPageOfInstallers() {
        if (this.selectedMeasure && this.postcode) {
            this.overwriteFormParametersWithLastSearchedValues();
            this.selectedInstallerId = null;
            this.errorMessage = null;
            this.loading = true;
            const nextPageNumber = this.paginator ? this.paginator.pageNumber + 1 : 1;
            this.fetchSpecificPageOfInstallers(nextPageNumber);
        } else {
            this.buildInvalidSearchErrorMessage();
        }
    }

    loadPreviousPageOfInstallers() {
        if (this.selectedMeasure && this.postcode) {
            this.overwriteFormParametersWithLastSearchedValues();
            this.selectedInstallerId = null;
            this.errorMessage = null;
            this.loading = true;
            const previousPageNumber = this.paginator && this.paginator.pageNumber > 1 ? this.paginator.pageNumber - 1 : 1;
            this.fetchSpecificPageOfInstallers(previousPageNumber);
        } else {
            this.buildInvalidSearchErrorMessage();
        }
    }

    overwriteFormParametersWithLastSearchedValues() {
        this.formSelectedMeasure = this.selectedMeasure;
        this.formPostcode = this.postcode;
    }

    fetchSpecificPageOfInstallers(pageNumber: number) {
        const tradeCodes = this.selectedMeasure.acf.trustmark_trade_codes.map(t => t.trade_code);
        this.installerSearchService
            .fetchInstallerDetails(this.postcode, tradeCodes, pageNumber)
            .subscribe(response => {
                this.paginator = response.paginator;
                this.installers = response.data;
                this.loading = false;
                this.searchHasBeenPerformed = true;
            }, error => {
                this.errorMessage = "Sorry, something went wrong. Please try again or come back later.";
            });
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

    getLastPageNumber() {
        return Math.ceil(this.paginator.totalCount / this.paginator.pageSize);
    }

    isValidPostcode() {
        return PostcodeEpcService.isValidPostcode(this.postcode);
    }
}
