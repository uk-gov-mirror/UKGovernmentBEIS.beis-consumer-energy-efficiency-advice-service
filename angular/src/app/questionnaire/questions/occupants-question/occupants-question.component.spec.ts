import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OccupantsQuestionComponent} from './occupants-question.component';
import {NumberQuestionComponent} from '../../common-questions/number-question/number-question.component';
import {FormsModule} from '@angular/forms';
import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {TimesPipe} from '../../../shared/times/times.pipe';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OccupantsQuestionComponent', () => {
    let component: OccupantsQuestionComponent;
    let fixture: ComponentFixture<OccupantsQuestionComponent>;

    const ORIGINAL_VALUE: number = 1;
    const NEW_VALUE: number = 2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OccupantsQuestionComponent, NumberQuestionComponent, TimesPipe],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OccupantsQuestionComponent);
        component = fixture.componentInstance;
        component.adultsAgedUnder64 = ORIGINAL_VALUE;
        component.adultsAged64To80 = ORIGINAL_VALUE;
        component.adultsAgedOver80 = ORIGINAL_VALUE;
        component.childrenAged5AndAbove = ORIGINAL_VALUE;
        component.childrenAgedUnder5 = ORIGINAL_VALUE;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of adults under 64 in response data', async(() => {
        fixture.whenStable().then(() => {
            const adultsUnder64Input = fixture.debugElement.query(By.css('.adults-under-64-input input'));
            expect(adultsUnder64Input.nativeElement.value).toBe(ORIGINAL_VALUE.toString());
        });
    }));

    it('should set the response given a valid number of adults aged under 64', () => {
        // given
        const expectedAdultsUnder64 = NEW_VALUE;

        // when
        const adultsInput = fixture.debugElement.query(By.css('.adults-under-64-input input'));
        adultsInput.nativeElement.value = expectedAdultsUnder64;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adultsAgedUnder64).toBe(expectedAdultsUnder64);
    });

    it('should populate with original number of adults aged 64 to 80 in response data', async(() => {
        fixture.whenStable().then(() => {
            const adults64To80Input = fixture.debugElement.query(By.css('.adults-64-to-80-input input'));
            expect(adults64To80Input.nativeElement.value).toBe(ORIGINAL_VALUE.toString());
        });
    }));

    it('should set the response given a valid number of adults aged 64 to 80', () => {
        // given
        const expectedAdults64To80 = NEW_VALUE;

        // when
        const adultsInput = fixture.debugElement.query(By.css('.adults-64-to-80-input input'));
        adultsInput.nativeElement.value = expectedAdults64To80;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adultsAged64To80).toBe(expectedAdults64To80);
    });

    it('should populate with original number of adults over 80 in response data', async(() => {
        fixture.whenStable().then(() => {
            const adultsOver80Input = fixture.debugElement.query(By.css('.adults-over-80-input input'));
            expect(adultsOver80Input.nativeElement.value).toBe(ORIGINAL_VALUE.toString());
        });
    }));

    it('should set the response given a valid number of adults aged 64 to 80', () => {
        // given
        const expectedAdultsOver80 = NEW_VALUE;

        // when
        const adultsInput = fixture.debugElement.query(By.css('.adults-over-80-input input'));
        adultsInput.nativeElement.value = expectedAdultsOver80;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adultsAgedOver80).toBe(expectedAdultsOver80);
    });

    it('should populate with original number of children aged 5 and above in response data', async(() => {
        fixture.whenStable().then(() => {
            const childrenInput = fixture.debugElement.query(By.css('.children-aged-5-and-above-input input'));
            expect(childrenInput.nativeElement.value).toBe(ORIGINAL_VALUE.toString());
        });
    }));

    it('should set the response given a valid number of children aged 5 and above', () => {
        // given
        const expectedChildrenAged5AndAbove = NEW_VALUE;

        // when
        const childrenInput = fixture.debugElement.query(By.css('.children-aged-5-and-above-input input'));
        childrenInput.nativeElement.value = expectedChildrenAged5AndAbove;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.childrenAged5AndAbove).toBe(expectedChildrenAged5AndAbove);
    });

    it('should populate with original number of children under 5 in response data', async(() => {
        fixture.whenStable().then(() => {
            const childrenInput = fixture.debugElement.query(By.css('.children-under-5-input input'));
            expect(childrenInput.nativeElement.value).toBe(ORIGINAL_VALUE.toString());
        });
    }));

    it('should set the response given a valid number of children aged 5 and above', () => {
        // given
        const expectedChildrenUnder5 = NEW_VALUE;

        // when
        const childrenInput = fixture.debugElement.query(By.css('.children-under-5-input input'));
        childrenInput.nativeElement.value = expectedChildrenUnder5;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.childrenAgedUnder5).toBe(expectedChildrenUnder5);
    });
});
