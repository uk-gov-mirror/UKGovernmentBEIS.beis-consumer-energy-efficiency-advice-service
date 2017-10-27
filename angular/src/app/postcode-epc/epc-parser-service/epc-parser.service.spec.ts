import {inject, TestBed} from "@angular/core/testing";

import {EpcParserService} from "./epc-parser.service";

describe('EpcParserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EpcParserService]
        });
    });

    it('should be created', inject([EpcParserService], (service: EpcParserService) => {
        expect(service).toBeTruthy();
    }));
});
