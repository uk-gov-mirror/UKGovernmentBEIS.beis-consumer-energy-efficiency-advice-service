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

    public onPdfClicked() {
        const expandableElements = document.getElementsByClassName("step-details-drawer");
        const elementsArray = Array.from(expandableElements);

        const expandedElements = document.querySelectorAll(".expanded.step-details-drawer");
        const exElementsArray = Array.from(expandedElements);

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

        let mutationCount = 0;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutationCount++;

                if (mutationCount === nonExCount) {
                    for (const elem of Array.from(<HTMLCollection>document.querySelectorAll('.headline'))) {
                        (<HTMLElement>elem).style.marginLeft = "20px";
                        (<HTMLElement>elem.nextElementSibling).style.marginLeft = "20px";
                    }

                    (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "hidden";

                    const pdfBody = document.getElementsByClassName("your-plan-page")[0];
                    html2pdf(pdfBody);

                    this.clickElems(nonExElementSiblings);
                    observer.disconnect();

                    for (const elem of Array.from(document.getElementsByClassName('.headline'))) {
                        (<HTMLElement>elem).style.marginLeft = "0px";
                        (<HTMLElement>elem.nextElementSibling).style.marginLeft = "0px";
                    }

                    (<HTMLElement>document.querySelector(".sticky-row")).style.visibility = "visible";
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
