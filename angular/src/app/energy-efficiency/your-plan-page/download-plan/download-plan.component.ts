import {Component} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import * as html2pdf from 'html2pdf.js';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import * as html2canvas from 'html2canvas';

// Fix https://github.com/niklasvh/html2canvas/issues/834
(window as any).html2canvas = {
    svg: html2canvas.svg
};

@Component({
    selector: 'app-download-plan',
    templateUrl: './download-plan.component.html',
    styleUrls: ['./download-plan.component.scss']
})
export class DownloadPlanComponent {

    pdfIsLoading: boolean;

    constructor(private googleAnalyticsService: GoogleAnalyticsService,
                private responseData: ResponseData) {
    }

    isTenant(): boolean {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy &&
            !!this.responseData.tenureType;
    }

    public onPdfClicked() {
        this.pdfIsLoading = true;
        window.setTimeout(() => this.onPdfClickedInner(), 0);
    }

    onPdfClickedInner() {
        this.sendEventToAnalytics('download-plan_clicked');

        const stepCards = document.getElementsByClassName("recommendation-step-card"); // Find all step cards
        const stepCardArray = Array.from(stepCards); // Convert to array because they are less limited than iterables

        const readMoreContent = document.getElementsByClassName("read-more-content-container");
        const readMoreArray = Array.from(readMoreContent);

        const reccomendationPageRow = document.getElementsByClassName("recommendations")[0];

        let mutationCount = 0;

        const self = this;
        const callback = function (elemObserver) {
            mutationCount++;

            if (mutationCount === (stepCards.length + 1)) { // If all drop downs have been opened

                (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "hidden";

                // Create the PDF
                const pdfBody = document.getElementsByClassName("your-plan-page")[0];
                html2pdf(pdfBody, {
                    html2canvas: {
                        // `AllowTaint` helps with SVG rendering, see
                        // https://github.com/niklasvh/html2canvas/issues/95
                        // We don't need to worry about taint as we have no CORS
                        allowTaint: true,
                        // A higher 'dpi' makes the screenshot higher resolution, which
                        // makes it less blurry but uses more memory:
                        dpi: 192,
                        // Not sure if this does anything, but it's in the html2pdf docs
                        // and sounds good:
                        letterRendering: true
                    }
                });

                // Close all the drop downs
                readMoreArray.map(elem => {
                    elem.classList.remove("read-more-expanded");
                });

                stepCardArray.map(elem => {
                    elem.classList.remove("print-mode");
                });
                reccomendationPageRow.classList.remove("print-mode");

                (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "visible";

                // There is no way to detect when the PDF has finished rendering
                // It can be several seconds
                // https://github.com/MrRio/jsPDF/issues/1754
                window.setTimeout(() => self.pdfIsLoading = false, 1000);

                // Disconnect the observer so the user cant trigger this callback afterwards
                elemObserver.disconnect();
            }
        };

        const observer = this.instantiateObserver(callback);

        for (const elem of stepCardArray) {
            observer.observe(elem, { // Attributes which should be observed
                attributes: true,
                subtree: true
            });
        }

        observer.observe(reccomendationPageRow, { // Attributes which should be observed
            attributes: true,
            subtree: true
        });

        stepCardArray.map(elem => {
            elem.classList.add("print-mode");
        });
        reccomendationPageRow.classList.add("print-mode");

        readMoreArray.map(elem => {
            elem.classList.add("read-more-expanded");
        });
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page');
    }

    private instantiateObserver(callback) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => callback(observer));
        });

        return observer;
    }

    private filterNonUnique(array1, array2, targetArray) {
        for (let i = 0; i < array1.length; i++) {
            let found = false;

            for (let j = 0; j < array2.length; j++) {
                if (array1[i] === array2[j]) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                targetArray.push(array1[i]);
            }
        }
    }
}
