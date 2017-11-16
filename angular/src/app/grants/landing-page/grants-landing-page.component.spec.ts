import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {GrantsLandingPageComponent} from "./grants-landing-page.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {PostcodeValidationService} from "../../shared/postcode-validation-service/postcode-validation.service";
import {FormsModule} from "@angular/forms";

describe('GrantsLandingPageComponent', () => {
    let component: GrantsLandingPageComponent;
    let fixture: ComponentFixture<GrantsLandingPageComponent>;

    const mockPostcodeValidationService = {
        isValid: (postcode: string) => true
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GrantsLandingPageComponent],
            providers: [
                ResponseData,
                {provide: PostcodeValidationService, useValue: mockPostcodeValidationService}
            ],
            imports: [
                RouterTestingModule,
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantsLandingPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});