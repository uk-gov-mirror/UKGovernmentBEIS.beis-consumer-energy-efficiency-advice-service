import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {OccupantsQuestionComponent} from "./occupants-question.component";
import {NumberQuestionComponent} from "../../../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {TimesPipe} from "../../../../../shared/times/times.pipe";

describe('OccupantsQuestionComponent', () => {
    let component: OccupantsQuestionComponent;
    let fixture: ComponentFixture<OccupantsQuestionComponent>;

    const originalNumberOfOccupants: number = 3;

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
        component.response = originalNumberOfOccupants;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of occupants in response data', async(() => {
        fixture.whenStable().then(() => {
            let occupantsInput = fixture.debugElement.query(By.css('input'));
            expect(occupantsInput.nativeElement.value).toBe(originalNumberOfOccupants.toString());
        });
    }));

    it('should set the response given a valid number of occupants', () => {
        // given
        const expectedOccupants = 5;

        // when
        let occupantsInput = fixture.debugElement.query(By.css('input'));
        occupantsInput.nativeElement.value = expectedOccupants;
        occupantsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.response).toBe(expectedOccupants);
    });

    it('should set the number of occupants given a valid number of occupants', () => {
        // given
        const expectedOccupants = 5;

        // when
        let occupantsInput = fixture.debugElement.query(By.css('input'));
        occupantsInput.nativeElement.value = expectedOccupants;
        occupantsInput.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // then
        expect(fixture.debugElement.queryAll(By.css('.icon-person')).length).toBe(expectedOccupants);
    });
});
