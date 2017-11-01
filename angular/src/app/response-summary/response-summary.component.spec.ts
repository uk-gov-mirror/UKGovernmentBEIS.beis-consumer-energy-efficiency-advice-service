import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TJsonViewerModule} from "t-json-viewer";

import {ResponseSummaryComponent} from "./response-summary.component";
import {ResponseData} from "../shared/response-data/response-data";

describe('ResponseSummaryComponent', () => {
    let component: ResponseSummaryComponent;
    let fixture: ComponentFixture<ResponseSummaryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResponseSummaryComponent],
            imports: [TJsonViewerModule],
        }).overrideComponent(ResponseSummaryComponent, {
            set: {providers: [ResponseData]}
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResponseSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
