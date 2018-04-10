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

    static clickElems(elems) {
        return elems.map(elem => {
            return this.eventFire(elem, 'click');
        });
    }

    static eventFire(el, etype) {
        if (el.fireEvent) {
            return el.fireEvent('on' + etype);
        } else {
            const evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            return el.dispatchEvent(evObj);
        }
    }

    isTenant(): boolean {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy &&
            !!this.responseData.tenureType;
    }

    public onPdfClicked() {
        const expandableElements = document.getElementsByClassName("step-details-drawer"); // Find all expandable elements
        const elementsArray = Array.from(expandableElements); // Convert to array because they are less limited than iterables

        const expandedElements = document.querySelectorAll(".expanded.step-details-drawer"); // Find all elements already expanded
        const exElementsArray = Array.from(expandedElements);

        const nonExElementsArray = [];

        // By filtering out elements which are both expandable and expanded, find the non-expanded elements
        this.filterNonUnique(elementsArray, exElementsArray, nonExElementsArray);

        const nonExCount = nonExElementsArray.length;

        const nonExElementSiblings = [];
        for (const elem of nonExElementsArray) {
            // Find the sibling of the non-expanded element (Only one) and push it
            nonExElementSiblings.push(elem.parentNode.childNodes[0].nextSibling);
        }

        let mutationCount = 0;

        const callback = function(elemObserver) {
            mutationCount++;

            if (mutationCount === nonExCount) { // If all drop downs have been opened
                // Do some styling
                for (const elem of Array.from(<HTMLCollection>document.querySelectorAll('.headline'))) {
                    (<HTMLElement>elem).style.marginLeft = "20px";
                    (<HTMLElement>elem.nextElementSibling).style.marginLeft = "20px";
                }

                (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "hidden";

                // Create the PDF
                const pdfBody = document.getElementsByClassName("your-plan-page")[0];
                html2pdf(pdfBody);

                // Close all the drop downs
                DownloadPlanComponent.clickElems(nonExElementSiblings);

                // Undo the styling
                for (const elem of Array.from(document.getElementsByClassName('.headline'))) {
                    (<HTMLElement>elem).style.marginLeft = "0px";
                    (<HTMLElement>elem.nextElementSibling).style.marginLeft = "0px";
                }

                (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "visible";

                // Disconnect the observer so the user cant trigger this callback afterwards
                elemObserver.disconnect();
            }
        };

        const observer = this.instantiateObserver(callback);

        for (const elem of elementsArray) {
            observer.observe(elem, { // Attributes which should be observed
                attributes: true
            });
        }

        DownloadPlanComponent.clickElems(nonExElementSiblings);
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
