import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {WordpressApiService} from '../../shared/wordpress-api-service/wordpress-api-service';
import 'rxjs/add/operator/toPromise';
import {ResponseData} from '../../shared/response-data/response-data';
import {GreenHomesGrantService} from "./green-homes-grant.service";

describe('GreenHomesGrantService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: GreenHomesGrantService;
    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            providers: [GreenHomesGrantService,
                {provide: ResponseData, useValue: responseData},
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}
            ],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(GreenHomesGrantService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getEligibility', () => {
        it('should not show GHG context for non-English addresses', async(() => {
            responseData.englishProperty = false;
            responseData.newBuild = false;

            expect(service.shouldShowGhgContext()).toBeFalsy();
        }));

        it('should not show GHG context for new builds', async(() => {
            responseData.englishProperty = true;
            responseData.newBuild = true;

            expect(service.shouldShowGhgContext()).toBeFalsy();
        }));

        it('should show GHG context for English non-new builds', async(() => {
            responseData.englishProperty = true;
            responseData.newBuild = false;

            expect(service.shouldShowGhgContext()).toBeTruthy();
        }));
    });
});
