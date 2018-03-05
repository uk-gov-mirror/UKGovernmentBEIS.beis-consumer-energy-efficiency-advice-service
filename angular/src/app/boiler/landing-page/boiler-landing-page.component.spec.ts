import {async, ComponentFixture, TestBed} from '@angular/core/testing';
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
import {GasAndOilBoiler} from '../gas-and-oil-boilers/gas-and-oil-boiler';
import {GasAndOilBoilersService} from '../gas-and-oil-boilers/gas-and-oil-boilers.service';
import {BoilerLinkButtonComponent} from '../boiler-link-button/boiler-link-button.component';

describe('BoilerLandingPageComponent', () => {
    let component: BoilerLandingPageComponent;
    let fixture: ComponentFixture<BoilerLandingPageComponent>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const gasAndOilBoilersData = require('assets/boilers/gas-and-oil-boiler.json');
    const gasAndOilBoilersServiceStub = {
        getGasAndOilBoilerWithIndexNumber: (index) => Observable.of(GasAndOilBoiler.fromJson(gasAndOilBoilersData[0])),
        getGasAndOilBoilersMatching: (term) => Observable.of(gasAndOilBoilersData.map(boilerJson => GasAndOilBoiler.fromJson(boilerJson))),
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
                RouterTestingModule
            ],
            providers: [
                {provide: GasAndOilBoilersService, useValue: gasAndOilBoilersServiceStub},
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                ResponseData,
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
