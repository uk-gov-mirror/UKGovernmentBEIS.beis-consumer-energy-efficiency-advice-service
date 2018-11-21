import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ResponseData} from '../../../shared/response-data/response-data';
import {HouseBuiltFormQuestionComponent} from './house-built-form-question.component';
import {HouseBuiltForm} from "./house-built-form";

describe('HouseBuiltFormQuestionComponent', () => {
    let fixture: ComponentFixture<HouseBuiltFormQuestionComponent>;
    let component: HouseBuiltFormQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HouseBuiltFormQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HouseBuiltFormQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a house built form option', () => {
        // given
        const detachedButton = fixture.debugElement.query(By.css('.detached'));

        // when
        detachedButton.nativeElement.click();

        // then
        expect(component.response).toBe(HouseBuiltForm.Detached);
    });

    it('should notify of completion when clicking on a house built form option', () => {
        // given
        const detachedButton = fixture.debugElement.query(By.css('.detached'));

        // when
        detachedButton.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
