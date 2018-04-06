import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {BoilerLandingPageComponent} from './boiler-landing-page.component';
import {CarouselComponent} from './carousel/carousel.component';
import {CarouselItemComponent} from './carousel/carousel-item/carousel-item.component';
import {TimesPipe} from '../../shared/times/times.pipe';
import {BoilerMakeModelLookupComponent} from '../make-model-lookup/boiler-make-model-lookup.component';
import {PostcodeLookupComponent} from '../../shared/postcode-lookup/postcode-lookup.component';
import {ResponseData} from '../../shared/response-data/response-data';
import {PostcodeEpcService} from '../../shared/postcode-epc-service/postcode-epc.service';
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {BoilerLinkButtonComponent} from '../boiler-link-button/boiler-link-button.component';

describe('BoilerLandingPageComponent', () => {
    let component: BoilerLandingPageComponent;
    let fixture: ComponentFixture<BoilerLandingPageComponent>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const postcodeApiServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerLandingPageComponent,
                CarouselComponent,
                CarouselItemComponent,
                BoilerMakeModelLookupComponent,
                PostcodeLookupComponent,
                TimesPipe,
                BoilerLinkButtonComponent,
            ],
            imports: [
                FormsModule,
                RouterTestingModule,
                InlineSVGModule,
            ],
            providers: [
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                ResponseData
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
});
