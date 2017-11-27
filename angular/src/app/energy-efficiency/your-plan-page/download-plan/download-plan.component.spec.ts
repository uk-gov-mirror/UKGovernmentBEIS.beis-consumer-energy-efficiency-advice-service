import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DownloadPlanComponent} from "./download-plan.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";

describe('DownloadPlanComponent', () => {
    let component: DownloadPlanComponent;
    let fixture: ComponentFixture<DownloadPlanComponent>;

    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            declarations: [
                DownloadPlanComponent,
            ],
            providers: [{provide: ResponseData, useValue: responseData}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadPlanComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display landlord report button if user is a tenant', () => {
        // given
        responseData.tenureType = TenureType.PrivateTenancy;

        // when
        fixture.detectChanges();

        // then
        const landlordReportButton = fixture.debugElement.query(By.css('.download-landlord-report'));
        expect(landlordReportButton).toBeTruthy();
    });

    it('should not display landlord report button if user is a homeowner', () => {
        // given
        responseData.tenureType = TenureType.OwnerOccupancy;

        // when
        fixture.detectChanges();

        // then
        const landlordReportButton = fixture.debugElement.query(By.css('.download-landlord-report'));
        expect(landlordReportButton).toBeFalsy();
    });
});