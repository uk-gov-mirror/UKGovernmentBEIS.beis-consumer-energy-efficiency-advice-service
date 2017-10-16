import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {HomeAgeQuestionComponent} from './home-age-question.component';
import {ResponseData} from '../response-data';
import {HomeAgeQuestion} from './home-age-question';
import {HomeAge} from './home-age';

describe('HomeAgeQuestionComponent', () => {
    let component: HomeAgeQuestionComponent;
    let fixture: ComponentFixture<HomeAgeQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeAgeQuestionComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeAgeQuestionComponent);
        component = fixture.componentInstance;
        responseData = new ResponseData();
        component.question = new HomeAgeQuestion(responseData);
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a home age', () => {
        // given
        const expectedHomeAge = HomeAge.from1950to1966;
        const homeAgeOptions = fixture.debugElement.query(By.css('.home-age-timeline'));
        const homeAgeOption = homeAgeOptions.children[expectedHomeAge];

        // when
        homeAgeOption.nativeElement.click();

        // then
        expect(responseData.homeAge).toBe(expectedHomeAge);
    });

    it('should notify of completion when clicking on a home age', () => {
        // given
        const expectedHomeAge = HomeAge.from1950to1966;
        const homeAgeOptions = fixture.debugElement.query(By.css('.home-age-timeline'));
        const homeAgeOption = homeAgeOptions.children[expectedHomeAge];

        // when
        homeAgeOption.nativeElement.click();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});