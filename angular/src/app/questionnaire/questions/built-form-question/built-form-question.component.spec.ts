import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ResponseData} from '../../../shared/response-data/response-data';
import {BuiltFormQuestionComponent} from './built-form-question.component';
import {BuiltFormAnswer} from "./built-form-answer";

describe('BuiltFormQuestionComponent', () => {
    let fixture: ComponentFixture<BuiltFormQuestionComponent>;
    let component: BuiltFormQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuiltFormQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuiltFormQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a built form option', () => {
        // given
        const detachedButton = fixture.debugElement.query(By.css('.detached'));

        // when
        detachedButton.nativeElement.click();

        // then
        expect(component.response).toBe(BuiltFormAnswer.Detached);
    });

    it('should notify of completion when clicking on a built form option', () => {
        // given
        const detachedButton = fixture.debugElement.query(By.css('.detached'));

        // when
        detachedButton.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
