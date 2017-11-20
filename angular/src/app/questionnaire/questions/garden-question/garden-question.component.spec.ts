import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {NouisliderModule} from "ng2-nouislider";

import {GardenQuestionComponent} from "./garden-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";

describe('GardenQuestionComponent', () => {
    let component: GardenQuestionComponent;
    let fixture: ComponentFixture<GardenQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GardenQuestionComponent],
            imports: [NouisliderModule],
            providers: [ResponseData],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GardenQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
