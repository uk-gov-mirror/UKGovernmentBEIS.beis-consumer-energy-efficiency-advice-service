import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';
import {ResponseData} from '../../../shared/response-data/response-data';
import {DetailedLengthOfHeatingOnQuestionComponent} from './detailed-length-of-heating-on-question.component';
import {NumberQuestionComponent} from '../../common-questions/number-question/number-question.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DetailedLengthOfHeatingOnQuestionComponent', () => {
    let component: DetailedLengthOfHeatingOnQuestionComponent;
    let fixture: ComponentFixture<DetailedLengthOfHeatingOnQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailedLengthOfHeatingOnQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(DetailedLengthOfHeatingOnQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the morning-evening questions if they pick the "Morning and evening"', () => {
        // given
        component.heatingPatternType = 3;
        fixture.detectChanges();

        // when
        fixture.whenStable().then(() => {
            const morningEveningQuestion = fixture.debugElement.query(By.css('.morning-evening-question'));
            expect(morningEveningQuestion).not.toBeNull();
        });
    });

    it('should show the heating hours questions if they pick the "Just once a day"', () => {
        // given
        component.heatingPatternType = 4;
        fixture.detectChanges();

        // when
        const heatingHoursQuestion = fixture.debugElement.query(By.css('.heating-hours-question'));
        expect(heatingHoursQuestion).not.toBeNull();
    });

    it('should update the value of heatingPatternType if the user picks an option', async (() => {
        fixture.whenStable().then(() => {
            const heatingPatternDropdown = fixture.debugElement.query(By.css('.heating-pattern-dropdown'));
            heatingPatternDropdown.nativeElement.value = "3: 4";
            heatingPatternDropdown.nativeElement.dispatchEvent(new Event('change'));
            expect(component.heatingPatternType).toEqual(4);
        });
    }));



    it('normalDaysOffHours should be correct if heatingPatternType is 3', async (() => {
        fixture.whenStable().then(() => {
            const heatingPatternDropdown = fixture.debugElement.query(By.css('.heating-pattern-dropdown'));
            heatingPatternDropdown.nativeElement.value = "2: 3";
            heatingPatternDropdown.nativeElement.dispatchEvent(new Event('change'));
            expect(component.setNormalDaysOffHours(responseData)).toEqual([11, 4]);
        });
    }));

    it('normalDaysOffHours should be correct if heatingPatternType is 4', async (() => {
        fixture.whenStable().then(() => {
            const heatingPatternDropdown = fixture.debugElement.query(By.css('.heating-pattern-dropdown'));
            heatingPatternDropdown.nativeElement.value = "3: 4";
            heatingPatternDropdown.nativeElement.dispatchEvent(new Event('change'));
            expect(component.setNormalDaysOffHours(responseData)).toEqual([24]);
        });
    }));

    it('normalDaysOffHours should be null if heatingPatternType is not 3 or 4', async (() => {
        fixture.whenStable().then(() => {
            const heatingPatternDropdown = fixture.debugElement.query(By.css('.heating-pattern-dropdown'));
            heatingPatternDropdown.nativeElement.value = "1: 2";
            heatingPatternDropdown.nativeElement.dispatchEvent(new Event('change'));
            expect(component.setNormalDaysOffHours(responseData)).toBeNull();
        });
    }));
});
