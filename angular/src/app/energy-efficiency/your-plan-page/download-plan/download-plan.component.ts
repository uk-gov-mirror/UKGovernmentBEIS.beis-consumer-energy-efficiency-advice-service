import {Component} from '@angular/core';
import {ResponseData} from '../../../shared/response-data/response-data';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import * as html2pdf from 'html2pdf.js';

@Component({
    selector: 'app-download-plan',
    templateUrl: './download-plan.component.html',
    styleUrls: ['./download-plan.component.scss']
})
export class DownloadPlanComponent {

    constructor(private responseData: ResponseData) {
    }

    isTenant(): boolean {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy &&
            !!this.responseData.tenureType;
    }

    public onPdfClicked() {

        const stepCards = document.getElementsByClassName("recommendation-step-card"); // Find all step cards
        const stepCardArray = Array.from(stepCards); // Convert to array because they are less limited than iterables

        const reccomendationPageRow = document.getElementsByClassName("recommendations")[0];

        let mutationCount = 0;

        const callback = function(observer) {
            mutationCount++;

            if (mutationCount === (stepCards.length + 1)) { // If all drop downs have been opened

                (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "hidden";

                // Create the PDF
                const pdfBody = document.getElementsByClassName("your-plan-page")[0];
                html2pdf(pdfBody);

                // Close all the drop downs
                stepCardArray.map(elem => {
                    elem.className = elem.className.slice(0, -11);
                });
                reccomendationPageRow.className = reccomendationPageRow.className.slice(0, -11);

                (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "visible";

                // Disconnect the observer so the user cant trigger this callback afterwards
                observer.disconnect();
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
            elem.className += " print-mode";
        });
        reccomendationPageRow.className += " print-mode";
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
