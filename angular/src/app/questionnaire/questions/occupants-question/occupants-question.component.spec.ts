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

    const originalNumberOfAdultsUnder64: number = 1;
    const originalNumberOfAdults64To80: number = 2;
    const originalNumberOfAdultsOver80: number = 3;
    const originalNumberOfChildrenAged5AndAbove: number = 4;
    const originalNumberOfChildrenUnder5: number = 5;

    const newNumberOfAdultsUnder64: number = 11;
    const newNumberOfAdults64To80: number = 12;
    const newNumberOfAdultsOver80: number = 13;
    const newNumberOfChildrenAged5AndAbove: number = 14;
    const newNumberOfChildrenUnder5: number = 15;

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
        component.adultsAgedUnder64 = originalNumberOfAdultsUnder64;
        component.adultsAged64To80 = originalNumberOfAdults64To80;
        component.adultsAgedOver80 = originalNumberOfAdultsOver80;
        component.childrenAged5AndAbove = originalNumberOfChildrenAged5AndAbove;
        component.childrenAgedUnder5 = originalNumberOfChildrenUnder5;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of adults under 64 in response data', async(() => {
        fixture.whenStable().then(() => {
            const adultsUnder64Input = fixture.debugElement.query(By.css('.adults-under-64-input input'));
            expect(adultsUnder64Input.nativeElement.value).toBe(originalNumberOfAdultsUnder64.toString());
        });
    }));

    it('should set the response given a valid number of adults aged under 64', () => {
        // when
        const adultsInput = fixture.debugElement.query(By.css('.adults-under-64-input input'));
        adultsInput.nativeElement.value = newNumberOfAdultsUnder64;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adultsAgedUnder64).toBe(newNumberOfAdultsUnder64);
    });

    it('should populate with original number of adults aged 64 to 80 in response data', async(() => {
        fixture.whenStable().then(() => {
            const adults64To80Input = fixture.debugElement.query(By.css('.adults-64-to-80-input input'));
            expect(adults64To80Input.nativeElement.value).toBe(originalNumberOfAdults64To80.toString());
        });
    }));

    it('should set the response given a valid number of adults aged 64 to 80', () => {
        // when
        const adultsInput = fixture.debugElement.query(By.css('.adults-64-to-80-input input'));
        adultsInput.nativeElement.value = newNumberOfAdults64To80;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adultsAged64To80).toBe(newNumberOfAdults64To80);
    });

    it('should populate with original number of adults over 80 in response data', async(() => {
        fixture.whenStable().then(() => {
            const adultsOver80Input = fixture.debugElement.query(By.css('.adults-over-80-input input'));
            expect(adultsOver80Input.nativeElement.value).toBe(originalNumberOfAdultsOver80.toString());
        });
    }));

    it('should set the response given a valid number of adults aged 64 to 80', () => {
        // when
        const adultsInput = fixture.debugElement.query(By.css('.adults-over-80-input input'));
        adultsInput.nativeElement.value = newNumberOfAdultsOver80;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adultsAgedOver80).toBe(newNumberOfAdultsOver80);
    });

    it('should populate with original number of children aged 5 and above in response data', async(() => {
        fixture.whenStable().then(() => {
            const childrenInput = fixture.debugElement.query(By.css('.children-aged-5-and-above-input input'));
            expect(childrenInput.nativeElement.value).toBe(originalNumberOfChildrenAged5AndAbove.toString());
        });
    }));

    it('should set the response given a valid number of children aged 5 and above', () => {
        // when
        const childrenInput = fixture.debugElement.query(By.css('.children-aged-5-and-above-input input'));
        childrenInput.nativeElement.value = newNumberOfChildrenAged5AndAbove;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.childrenAged5AndAbove).toBe(newNumberOfChildrenAged5AndAbove);
    });

    it('should populate with original number of children under 5 in response data', async(() => {
        fixture.whenStable().then(() => {
            const childrenInput = fixture.debugElement.query(By.css('.children-under-5-input input'));
            expect(childrenInput.nativeElement.value).toBe(originalNumberOfChildrenUnder5.toString());
        });
    }));

    it('should set the response given a valid number of children aged 5 and above', () => {
        // when
        const childrenInput = fixture.debugElement.query(By.css('.children-under-5-input input'));
        childrenInput.nativeElement.value = newNumberOfChildrenUnder5;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.childrenAgedUnder5).toBe(newNumberOfChildrenUnder5);
    });
});
