import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {HomeTypeQuestionComponent} from './home-type-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {HomeType} from './home-type';
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('HomeTypeQuestionComponent', () => {
    let fixture: ComponentFixture<HomeTypeQuestionComponent>;
    let component: HomeTypeQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeTypeQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeTypeQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a home type', () => {
        // given

        // when
        const detachedHouse = fixture.debugElement.query(By.css('.house'));
        detachedHouse.nativeElement.click();

        // then
        expect(component.response).toBe(HomeType.House);
    });
});
