import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {HomeAgeQuestionComponent} from './home-age-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {HomeAge} from './home-age';

describe('HomeAgeQuestionComponent', () => {
    let component: HomeAgeQuestionComponent;
    let fixture: ComponentFixture<HomeAgeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeAgeQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeAgeQuestionComponent);
        component = fixture.componentInstance;
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
        expect(component.response).toBe(expectedHomeAge);
    });
});
