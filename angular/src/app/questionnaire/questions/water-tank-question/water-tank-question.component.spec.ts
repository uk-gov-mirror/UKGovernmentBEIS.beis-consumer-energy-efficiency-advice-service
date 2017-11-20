import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {WaterTankQuestionComponent} from "./water-tank-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";

describe('WaterTankQuestionComponent', () => {
    let component: WaterTankQuestionComponent;
    let fixture: ComponentFixture<WaterTankQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaterTankQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaterTankQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
