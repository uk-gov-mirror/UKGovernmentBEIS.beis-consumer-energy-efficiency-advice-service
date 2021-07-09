import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InstallerMapComponent} from "./installer-map.component";
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {Observable} from 'rxjs/Observable';
import {PostcodeBasicDetailsResponse} from "../../shared/postcode-epc-service/model/response/postcode-basic-details-response";

describe('InstallerMapComponent', () => {
    let component: InstallerMapComponent;
    let fixture: ComponentFixture<InstallerMapComponent>;
    const dummyBasicPostcodeDetails = require('assets/test/dummy-postcode-response.json');

    const postcodeApiServiceStub = {
        fetchBasicPostcodeDetails: () => Observable.of(dummyBasicPostcodeDetails)
    };

    beforeEach(async(() => {
        spyOn(postcodeApiServiceStub, 'fetchBasicPostcodeDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                InstallerMapComponent
            ],
            imports: [],
            providers: [
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InstallerMapComponent);
        component = fixture.componentInstance;
        component.installers = [];
        component.postcode = "test postcode";
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch the postcode details', () => {
        // when
        fixture.detectChanges();

        // then
        expect(postcodeApiServiceStub.fetchBasicPostcodeDetails).toHaveBeenCalledWith("test postcode");
    });
});
