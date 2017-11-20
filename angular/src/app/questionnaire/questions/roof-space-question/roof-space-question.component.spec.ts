import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {RoofSpaceQuestionComponent} from "./roof-space-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {RoofSpace} from "./roof-space";

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
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on an option', () => {
        // given
        let noSpace = fixture.debugElement.queryAll(By.css('.roof-space-button')).find(el => el.nativeElement.innerText === 'No space');

        // when
        noSpace.nativeElement.click();

        // then
        expect(component.response).toBe(RoofSpace.NoSpace);
    });

    it('should notify of completion when clicking on an option', () => {
        // given
        let noSpace = fixture.debugElement.queryAll(By.css('.roof-space-button')).find(el => el.nativeElement.innerText === 'No space');

        // when
        noSpace.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
