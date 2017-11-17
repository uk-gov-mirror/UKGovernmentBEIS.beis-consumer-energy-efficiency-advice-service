import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {ConstructionQuestionComponent} from "./construction-question.component";

describe('ShowerTypeQuestionComponent', () => {
    let component: ConstructionQuestionComponent;
    let fixture: ComponentFixture<ConstructionQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConstructionQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConstructionQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
