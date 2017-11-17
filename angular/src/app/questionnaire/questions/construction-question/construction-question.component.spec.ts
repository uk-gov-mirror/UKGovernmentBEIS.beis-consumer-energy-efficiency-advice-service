import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {InsulationQuestionComponent} from "./insulation-question.component";

describe('ShowerTypeQuestionComponent', () => {
    let component: InsulationQuestionComponent;
    let fixture: ComponentFixture<InsulationQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InsulationQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InsulationQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
