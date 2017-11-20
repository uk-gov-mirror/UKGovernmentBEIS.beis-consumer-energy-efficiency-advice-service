import {async, getTestBed, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import "rxjs/add/operator/toPromise";

import {PostcodeEpcService} from "./postcode-epc.service";
import {EpcApiService} from "./epc-api-service/epc-api.service";
import {PostcodeApiService} from "./postcode-api-service/postcode-api.service";
import {FeatureFlagService} from "../feature-flag/feature-flag.service";
import {FeatureFlags} from "../feature-flag/feature-flags";
import {EpcParserService} from "./epc-api-service/epc-parser.service";
import {Epc} from "./model/epc";
import {PostcodeBasicDetailsResponse} from "./model/response/postcode-basic-details-response";

describe('PostcodeEpcService', () => {
    let injector: TestBed;
    let service: PostcodeEpcService;

    const dummyPostcodeBasicDetails = require('assets/test/dummy-postcode-response.json');
    const dummyEpcs = EpcParserService.parse(require('assets/test/dummy-epcs-response.json'));

    // match data in dummy response files above
    const postcode = 'SW1A1AA';
    const localAuthorityCode = 'E09000033';

    let featureFlagResponse: Observable<FeatureFlags>;
    let postcodeBasicDetailsResponse: Observable<PostcodeBasicDetailsResponse>;
    let epcsResponse: Observable<Epc[]>;

    let featureFlagServiceStub = {
        fetchFeatureFlags: () => featureFlagResponse
    };
    let epcApiServiceStub = {
        getEpcsForPostcode: () => epcsResponse
    };
    let postcodeApiServiceStub = {
        fetchBasicPostcodeDetails: () => postcodeBasicDetailsResponse
    };

    beforeEach(() => {
        featureFlagResponse = Observable.of({fetch_epc_data: true});
        epcsResponse = Observable.of(dummyEpcs);
        postcodeBasicDetailsResponse = Observable.of(dummyPostcodeBasicDetails);

        spyOn(postcodeApiServiceStub, 'fetchBasicPostcodeDetails').and.callThrough();
        spyOn(epcApiServiceStub, 'getEpcsForPostcode').and.callThrough();
        spyOn(featureFlagServiceStub, 'fetchFeatureFlags').and.callThrough();

        TestBed.configureTestingModule({
            providers: [PostcodeEpcService,
                {provide: EpcApiService, useValue: epcApiServiceStub},
                {provide: FeatureFlagService, useValue: featureFlagServiceStub},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub}],
        });
        injector = getTestBed();
        service = injector.get(PostcodeEpcService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchPostcodeDetails', () => {

        it('should check the epc-fetching feature flag', async(() => {
            // when
            service.fetchPostcodeDetails(postcode)
                .toPromise().then(() => {

                // then
                expect(featureFlagServiceStub.fetchFeatureFlags).toHaveBeenCalled();
            });
        }));

        it('should fetch EPCs if the epc-fetching feature flag is true', async(() => {
            // when
            service.fetchPostcodeDetails(postcode)
                .toPromise().then(() => {

                // then
                expect(epcApiServiceStub.getEpcsForPostcode).toHaveBeenCalledWith(postcode);
            });
        }));

        it('should return data returned by EPC API', async(() => {
            // when
            const postcodeDetails = service.fetchPostcodeDetails(postcode);

            // then
            postcodeDetails.toPromise().then((postcodeDetails) => {
                expect(postcodeDetails.postcode).toEqual(postcode);
                expect(postcodeDetails.allEpcsForPostcode).toEqual(dummyEpcs);
                expect(postcodeDetails.localAuthorityCode).toEqual(localAuthorityCode);
            });
        }));

        it('should lookup and return basic postcode details if there is an error fetching EPCs', async(() => {
            // given
            epcsResponse = ErrorObservable.create('test network error');

            // when
            const postcodeDetails = service.fetchPostcodeDetails(postcode);

            postcodeDetails.toPromise().then((postcodeDetails) => {
                // then
                expect(postcodeApiServiceStub.fetchBasicPostcodeDetails).toHaveBeenCalledWith(postcode);
                expect(postcodeDetails.postcode).toEqual(postcode);
                expect(postcodeDetails.localAuthorityCode).toEqual(localAuthorityCode);
                expect(postcodeDetails.allEpcsForPostcode.length).toBe(0);
            });
        }));

        it('should not fetch EPCs if the epc-fetching feature flag is false', async(() => {
            // given
            featureFlagResponse = Observable.of({fetch_epc_data: false});

            // when
            service.fetchPostcodeDetails(postcode)
                .toPromise().then(() => {

                // then
                expect(epcApiServiceStub.getEpcsForPostcode).not.toHaveBeenCalled();
            });
        }));

        it('should lookup and return basic postcode details if the epc-fetching feature flag is false', async(() => {
            // given
            featureFlagResponse = Observable.of({fetch_epc_data: false});

            // when
            const postcodeDetails = service.fetchPostcodeDetails(postcode);

            postcodeDetails.toPromise().then((postcodeDetails) => {
                // then
                expect(postcodeApiServiceStub.fetchBasicPostcodeDetails).toHaveBeenCalledWith(postcode);
                expect(postcodeDetails.postcode).toEqual(postcode);
                expect(postcodeDetails.localAuthorityCode).toEqual(localAuthorityCode);
                expect(postcodeDetails.allEpcsForPostcode.length).toBe(0);
            });
        }));

        it('should not fetch EPCs if there is an error fetching feature flags', async(() => {
            // given
            featureFlagResponse = ErrorObservable.create('test network error');

            // when
            service.fetchPostcodeDetails(postcode)
                .toPromise().then(() => {

                // then
                expect(epcApiServiceStub.getEpcsForPostcode).not.toHaveBeenCalled();
            });
        }));

        it('should lookup and return basic postcode details if there is an error fetching feature flags', async(() => {
            // given
            featureFlagResponse = ErrorObservable.create('test network error');

            // when
            const postcodeDetails = service.fetchPostcodeDetails(postcode);

            postcodeDetails.toPromise().then((postcodeDetails) => {
                // then
                expect(postcodeApiServiceStub.fetchBasicPostcodeDetails).toHaveBeenCalledWith(postcode);
                expect(postcodeDetails.postcode).toEqual(postcode);
                expect(postcodeDetails.localAuthorityCode).toEqual(localAuthorityCode);
                expect(postcodeDetails.allEpcsForPostcode.length).toBe(0);
            });
        }));

        it('should trow a specific error if the postcode is not found', async(() => {
            // given
            featureFlagResponse = Observable.of({fetch_epc_data: false});
            postcodeBasicDetailsResponse = ErrorObservable.create({
                status: PostcodeApiService.postcodeNotFoundStatus
            });

            // when
            service.fetchPostcodeDetails(postcode).subscribe(

                // then
                () => fail('expected an error'),
                (error) => expect(error).toEqual(PostcodeEpcService.POSTCODE_NOT_FOUND)
            );
        }));

        it('should throw an error if there is an error fetching basic postcode details', async(() => {
            // given
            featureFlagResponse = Observable.of({fetch_epc_data: false});
            postcodeBasicDetailsResponse = ErrorObservable.create('test network error');

            // when
            service.fetchPostcodeDetails(postcode).subscribe(

                // then
                () => fail('expected an error'),
                (error) => expect(error).toBeTruthy()
            );
        }));
    });
    
    describe('#isValidPostcode', () => {
        it('should recognise a correct postcode without space as valid', () => {
            expect(PostcodeEpcService.isValidPostcode('SW1H0ET')).toBeTruthy();
        });

        it('should recognise a lowercase postcode as valid', () => {
            expect(PostcodeEpcService.isValidPostcode('sw1h 0et')).toBeTruthy();
        });

        it('should recognise a correct shorter postcode as valid', () => {
            expect(PostcodeEpcService.isValidPostcode('s1 0et')).toBeTruthy();
        });

        it('should recognise an incorrect postcode as invalid', () => {
            expect(PostcodeEpcService.isValidPostcode('s1 0e')).toBeFalsy();
        });

        it('should recognise a postcode input with special characters as invalid', () => {
            expect(PostcodeEpcService.isValidPostcode('SW!H 0ET')).toBeFalsy();
        });
    });
});