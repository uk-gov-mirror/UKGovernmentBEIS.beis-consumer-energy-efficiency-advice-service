import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {RoofSpaceQuestionComponent} from "./roof-space-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";

describe('RoofSpaceQuestionComponent', () => {
    let component: RoofSpaceQuestionComponent;
    let fixture: ComponentFixture<RoofSpaceQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoofSpaceQuestionComponent],
            providers: [ResponseData],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoofSpaceQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
