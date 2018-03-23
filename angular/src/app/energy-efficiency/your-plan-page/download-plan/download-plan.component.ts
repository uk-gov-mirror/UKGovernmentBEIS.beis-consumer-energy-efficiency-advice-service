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

    public listenForExpansion() {
        // Create an array of step rows
        // Create an array of expanded step rows
        // Create a mutation observer for each step row
        // Have the mutation observer count up whenever a mutation happens within the function
        // Call a click event on each element which is not in both arrays
        // Have some count for whenever the count has reached a certain amount, when it has you can do the PDF
        // Call another onclick on the step rows which aren't in both
    }

    public onPdfClicked() {
        const expandableElements = document.getElementsByClassName("step-details-drawer");
        const elementsArray = Array.from(expandableElements);

        const expandedElements = document.querySelectorAll(".expanded.step-details-drawer");
        const exElementsArray = Array.from(expandedElements);

        // console.log(expandableElements);
        // console.log(expandedElements);

        const nonExElementsArray = [];
        for (let i = 0; i < elementsArray.length; i++) {
            let found = false;

            for (let j = 0; j < exElementsArray.length; j++) { // j < is missed;
                if (elementsArray[i] === exElementsArray[j]) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                nonExElementsArray.push(elementsArray[i]);
            }
        }

        const nonExCount = nonExElementsArray.length;

        const nonExElementSiblings = [];
        for (const elem of nonExElementsArray) {
            nonExElementSiblings.push(elem.parentNode.childNodes[0].nextSibling);
        }

        // console.log(nonExElementSiblings);
        //
        // console.log(nonExElementsArray);

        let mutationCount = 0;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutationCount++;

                if (mutationCount === nonExCount) {
                    const pdfBody = document.getElementsByClassName("your-plan-content")[0];
                    html2pdf(pdfBody);
                    // console.log(nonExElementSiblings);
                    this.clickElems(nonExElementSiblings);
                    observer.disconnect();
                }
            });
        });

        for (const elem of elementsArray) {
            observer.observe(elem, {
                attributes: true,
                childList: true,
                characterData: true,
                attributeOldValue: true
            });
        }

        this.clickElems(nonExElementSiblings);
    }

    isTenant(): boolean {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy &&
            !!this.responseData.tenureType;
    }

    public clickElems(elems) {
        return elems.map(elem => {
            return this.eventFire(elem, 'click');
        });
    }

    public eventFire(el, etype) {
        if (el.fireEvent) {
            return el.fireEvent('on' + etype);
        } else {
            const evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            return el.dispatchEvent(evObj);
        }
    }
}
