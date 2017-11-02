import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ShowersQuestionComponent} from "./showers-question.component";
import {NumberQuestionComponent} from "../../../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {TimesPipe} from "../../../../../shared/times/times.pipe";

describe('ShowersQuestionComponent', () => {
    let component: ShowersQuestionComponent;
    let fixture: ComponentFixture<ShowersQuestionComponent>;

    const originalNumberOfShowers: number = 3;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowersQuestionComponent, NumberQuestionComponent, TimesPipe],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowersQuestionComponent);
        component = fixture.componentInstance;
        component.response = originalNumberOfShowers;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of showers in response data', async(() => {
        fixture.whenStable().then(() => {
            let showersInput = fixture.debugElement.query(By.css('input'));
            expect(showersInput.nativeElement.value).toBe(originalNumberOfShowers.toString());
        });
    }));

    it('should set the response given a valid number of showers', () => {
        // given
        const expectedShowers = 5;

        // when
        let showersInput = fixture.debugElement.query(By.css('input'));
        showersInput.nativeElement.value = expectedShowers;
        showersInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.response).toBe(expectedShowers);
    });
});
