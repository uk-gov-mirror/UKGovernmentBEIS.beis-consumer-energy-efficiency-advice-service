import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {TroubleshootingPageComponent} from './troubleshooting-page.component';
import {PostcodeLookupComponent} from "../../shared/postcode-lookup/postcode-lookup.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {Observable} from "rxjs/Observable";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

describe('TroubleshootingPageComponent', () => {
    let component: TroubleshootingPageComponent;
    let fixture: ComponentFixture<TroubleshootingPageComponent>;

    const postcodeApiServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };
    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TroubleshootingPageComponent,
                PostcodeLookupComponent,
                SpinnerAndErrorContainerComponent,
            ],
            imports: [
                FormsModule,
                RouterTestingModule,
                InlineSVGModule,
            ],
            providers: [
                {provide: ResponseData, useClass: MockResponseData},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TroubleshootingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    class MockResponseData {
        public postcode = "Test Postcode";
    }
});
