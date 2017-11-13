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

    const originalNumberOfAdults: number = 1;
    const originalNumberOfChildren: number = 3;

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
        component.adults = originalNumberOfAdults;
        component.children = originalNumberOfChildren;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of adults in response data', async(() => {
        fixture.whenStable().then(() => {
            let adultsInput = fixture.debugElement.query(By.css('.adults-input input'));
            expect(adultsInput.nativeElement.value).toBe(originalNumberOfAdults.toString());
        });
    }));

    it('should set the response given a valid number of adults', () => {
        // given
        const expectedAdults = 2;

        // when
        let adultsInput = fixture.debugElement.query(By.css('.adults-input input'));
        adultsInput.nativeElement.value = expectedAdults;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.adults).toBe(expectedAdults);
    });

    it('should display the number of adults given a valid number of adults', () => {
        // given
        const expectedAdults = 2;

        // when
        let adultsInput = fixture.debugElement.query(By.css('.adults-input input'));
        adultsInput.nativeElement.value = expectedAdults;
        adultsInput.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // then
        expect(fixture.debugElement.queryAll(By.css('.icon-person-large')).length).toBe(expectedAdults);
    });

    it('should populate with original number of children in response data', async(() => {
        fixture.whenStable().then(() => {
            let childrenInput = fixture.debugElement.query(By.css('.children-input input'));
            expect(childrenInput.nativeElement.value).toBe(originalNumberOfChildren.toString());
        });
    }));

    it('should set the response given a valid number of children', () => {
        // given
        const expectedChildren = 4;

        // when
        let childrenInput = fixture.debugElement.query(By.css('.children-input input'));
        childrenInput.nativeElement.value = expectedChildren;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.children).toBe(expectedChildren);
    });

    it('should display the number of children given a valid number of children', () => {
        // given
        const expectedChildren = 4;

        // when
        let childrenInput = fixture.debugElement.query(By.css('.children-input input'));
        childrenInput.nativeElement.value = expectedChildren;
        childrenInput.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // then
        expect(fixture.debugElement.queryAll(By.css('.icon-person')).length).toBe(expectedChildren);
    });
});
