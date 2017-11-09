import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {BoilerTypeQuestionComponent} from "./boiler-type-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";

describe('BoilerTypeQuestionComponent', () => {
    let component: BoilerTypeQuestionComponent;
    let fixture: ComponentFixture<BoilerTypeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerTypeQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerTypeQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on one of the buttons', () => {
        // given

        // when
        let yes = fixture.debugElement.query(By.css('#yes-button'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(true);
    });

    it('should notify of completion when clicking on one of the buttons', () => {
        // given

        // when
        let no = fixture.debugElement.query(By.css('#no-button'));
        no.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
