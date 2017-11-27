import {Component, OnInit, ViewChild, HostListener, DoCheck} from "@angular/core";
import {ResponseData} from "../../../shared/response-data/response-data";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";

@Component({
    selector: 'app-download-plan',
    templateUrl: './download-plan.component.html',
    styleUrls: ['./download-plan.component.scss']
})
export class DownloadPlanComponent implements OnInit, DoCheck {

    @ViewChild('downloadPlanRow') downloadPlanRow;

    isFixedPosition: boolean = true;
    downloadPlanRowHeightPixels: number;

    constructor(private responseData: ResponseData) {
    }

    ngOnInit() {
        this.updateYourPlanRowPosition();
        this.downloadPlanRowHeightPixels = this.downloadPlanRow.nativeElement.clientHeight;
    }

    ngDoCheck() {
        this.downloadPlanRowHeightPixels = this.downloadPlanRow.nativeElement.clientHeight;
    }

    @HostListener("window:scroll", [])
    updateYourPlanRowPosition() {
        const footer = document.querySelector('#page-footer');
        if (footer) {
            const footerTopPosition = footer.getBoundingClientRect().top;
            const footerVisibleHeight = window.innerHeight - footerTopPosition;
            this.isFixedPosition = footerVisibleHeight < 0;
        }
    }

    isTenant(): boolean {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy &&
            !!this.responseData.tenureType;
    }
}