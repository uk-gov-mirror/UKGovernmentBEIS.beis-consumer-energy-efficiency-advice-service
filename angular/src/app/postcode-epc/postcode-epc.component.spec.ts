import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PostcodeEpcComponent} from "./postcode-epc.component";
import {FormsModule} from "@angular/forms";
import {PostcodeEpcService} from "./api-service/postcode-epc.service";
import {EpcParserService} from "./epc-parser-service/epc-parser.service";

describe('PostcodeEpcComponent', () => {
    let component: PostcodeEpcComponent;
    let fixture: ComponentFixture<PostcodeEpcComponent>;

    let apiServiceStub = {};
    let parserServiceStub = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostcodeEpcComponent],
            imports: [FormsModule]
        }).overrideComponent(PostcodeEpcComponent, {
            set: {
                providers: [
                    {provide: PostcodeEpcService, useValue: apiServiceStub},
                    {provide: EpcParserService, useValue: parserServiceStub}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostcodeEpcComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
