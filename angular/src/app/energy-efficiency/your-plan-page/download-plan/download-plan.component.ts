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
        const expandableElements = document.getElementsByClassName("step-main-row");
        const elementsArray = [].slice.call(expandableElements);
        Promise.all([this.clickElems(elementsArray)])
            .then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const pdfBody = document.getElementsByClassName("your-plan-content")[0];
                        html2pdf(pdfBody);
                        resolve();
                    }, 5 );
                });
            })
        .then(() => {
            this.clickElems(elementsArray);
        });
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
