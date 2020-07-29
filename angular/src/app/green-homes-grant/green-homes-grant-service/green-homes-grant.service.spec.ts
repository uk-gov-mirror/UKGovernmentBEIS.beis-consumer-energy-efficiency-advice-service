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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [GreenHomesGrantService,
                ResponseData,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}},
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
});
