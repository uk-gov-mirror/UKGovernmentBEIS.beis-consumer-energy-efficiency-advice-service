import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {OccupantsQuestionComponent} from "./occupants-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {TimesPipe} from "../../../shared/times/times.pipe";

describe('OccupantsQuestionComponent', () => {
    let component: OccupantsQuestionComponent;
    let fixture: ComponentFixture<OccupantsQuestionComponent>;

    const originalNumberOfAdultsUnder64: number = 1;
    const originalNumberOfAdults64To80: number = 2;
    const originalNumberOfAdultsOver80: number = 3;
    const originalNumberOfChildren: number = 4;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OccupantsQuestionComponent, NumberQuestionComponent, TimesPipe],
            imports: [FormsModule],
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
        component.children = originalNumberOfChildren;
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
        // given
        const expectedAdultsUnder64 = 2;

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
            expect(adults64To80Input.nativeElement.value).toBe(originalNumberOfAdults64To80.toString());
        });
    }));

    it('should set the response given a valid number of adults aged 64 to 80', () => {
        // given
        const expectedAdults64To80 = 2;

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
            expect(adultsOver80Input.nativeElement.value).toBe(originalNumberOfAdultsOver80.toString());
        });
    }));

    it('should set the response given a valid number of adults aged 64 to 80', () => {
        // given
        const expectedAdultsOver80 = 2;

        // when
        const adultsInput = fixture.debugElement.query(By.css('.adults-over-80-input input'));
        adultsInput.nativeElement.value = expectedAdultsOver80;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adultsAgedOver80).toBe(expectedAdultsOver80);
    });

    it('should display the number of adults given the response data', () => {
        // given
        const expectedAdults = originalNumberOfAdults64To80 + originalNumberOfAdultsUnder64 + originalNumberOfAdultsOver80;

        // when
        fixture.detectChanges();

        // then
        expect(fixture.debugElement.queryAll(By.css('.icon-person-large')).length).toBe(expectedAdults);
    });

    it('should populate with original number of children in response data', async(() => {
        fixture.whenStable().then(() => {
            const childrenInput = fixture.debugElement.query(By.css('.children-input input'));
            expect(childrenInput.nativeElement.value).toBe(originalNumberOfChildren.toString());
        });
    }));

    it('should set the response given a valid number of children', () => {
        // given
        const expectedChildren = 4;

        // when
        const childrenInput = fixture.debugElement.query(By.css('.children-input input'));
        childrenInput.nativeElement.value = expectedChildren;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.children).toBe(expectedChildren);
    });

    it('should display the number of children given a valid number of children', () => {
        // given
        const expectedChildren = 4;

        // when
        const childrenInput = fixture.debugElement.query(By.css('.children-input input'));
        childrenInput.nativeElement.value = expectedChildren;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // then
        expect(fixture.debugElement.queryAll(By.css('.icon-person')).length).toBe(expectedChildren);
    });
});
