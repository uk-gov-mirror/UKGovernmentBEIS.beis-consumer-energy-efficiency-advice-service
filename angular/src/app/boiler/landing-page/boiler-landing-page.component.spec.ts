import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {BoilerLandingPageComponent} from './boiler-landing-page.component';
import {TimesPipe} from '../../shared/times/times.pipe';
import {BoilerMakeModelLookupComponent} from '../make-model-lookup/boiler-make-model-lookup.component';
import {PostcodeLookupComponent} from '../../shared/postcode-lookup/postcode-lookup.component';
import {ResponseData} from '../../shared/response-data/response-data';
import {PostcodeEpcService} from '../../shared/postcode-epc-service/postcode-epc.service';
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {RouterLinkButtonComponent} from '../../shared/router-link-button/router-link-button.component';
import {SpinnerAndErrorContainerComponent} from '../../shared/spinner-and-error-container/spinner-and-error-container.component';
import {EpcLookupComponent} from '../../shared/epc-lookup/epc-lookup.component';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

describe('BoilerLandingPageComponent', () => {
    let component: BoilerLandingPageComponent;
    let fixture: ComponentFixture<BoilerLandingPageComponent>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const postcodeApiServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerLandingPageComponent,
                BoilerMakeModelLookupComponent,
                PostcodeLookupComponent,
                EpcLookupComponent,
                TimesPipe,
                RouterLinkButtonComponent,
                SpinnerAndErrorContainerComponent
            ],
            imports: [
                FormsModule,
                RouterTestingModule,
                InlineSVGModule,
            ],
            providers: [
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                {provide: ResponseData, useClass: MockResponseData},
                {provide: PageTitleService, useValue: pageTitleStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerLandingPageComponent);
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
