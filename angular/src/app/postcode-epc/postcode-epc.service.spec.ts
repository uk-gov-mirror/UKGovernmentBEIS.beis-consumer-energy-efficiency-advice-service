import {inject, TestBed} from "@angular/core/testing";

import {PostcodeEpcService} from "./postcode-epc.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {WordpressApiService} from "../common/wordpress-api-service/wordpress-api-service";

describe('PostcodeEpcService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostcodeEpcService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
    });

    it('should be created', inject([PostcodeEpcService], (service: PostcodeEpcService) => {
        expect(service).toBeTruthy();
    }));
});
