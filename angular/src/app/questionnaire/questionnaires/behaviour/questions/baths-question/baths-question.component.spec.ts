import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BathsQuestionComponent} from "./baths-question.component";
import {NumberQuestionComponent} from "../../../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {TimesPipe} from "../../../../../shared/times/times.pipe";

describe('OccupantsQuestionComponent', () => {
    let component: BathsQuestionComponent;
    let fixture: ComponentFixture<BathsQuestionComponent>;

    const originalNumberOfBaths: number = 3;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BathsQuestionComponent, NumberQuestionComponent, TimesPipe],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BathsQuestionComponent);
        component = fixture.componentInstance;
        component.response = originalNumberOfBaths;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of baths in response data', async(() => {
        fixture.whenStable().then(() => {
            let bathsInput = fixture.debugElement.query(By.css('input'));
            expect(bathsInput.nativeElement.value).toBe(originalNumberOfBaths.toString());
        });
    }));

    it('should set the response given a valid number of baths', () => {
        // given
        const expectedBaths = 5;

        // when
        let bathsInput = fixture.debugElement.query(By.css('input'));
        bathsInput.nativeElement.value = expectedBaths;
        bathsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.response).toBe(expectedBaths);
    });
});
