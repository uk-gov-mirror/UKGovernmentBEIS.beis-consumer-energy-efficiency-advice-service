import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BedroomsQuestionComponent} from "./bedrooms-question.component";
import {NumberQuestionComponent} from "../../../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {TimesPipe} from "../../../../../shared/times/times.pipe";

describe('BedroomsQuestionComponent', () => {
    let component: BedroomsQuestionComponent;
    let fixture: ComponentFixture<BedroomsQuestionComponent>;

    const originalNumberOfBedrooms: number = 3;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BedroomsQuestionComponent, NumberQuestionComponent, TimesPipe],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BedroomsQuestionComponent);
        component = fixture.componentInstance;
        component.response = originalNumberOfBedrooms;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of bedrooms in response data', async(() => {
        fixture.whenStable().then(() => {
            let bedroomsInput = fixture.debugElement.query(By.css('input'));
            expect(bedroomsInput.nativeElement.value).toBe(originalNumberOfBedrooms.toString());
        });
    }));

    it('should set the response given a valid number of bedrooms', () => {
        // given
        const expectedBedrooms = 5;

        // when
        let storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = expectedBedrooms;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.response).toBe(expectedBedrooms);
    });

    it('should set the number of beds given a valid number of bedrooms', () => {
        // given
        const expectedBedrooms = 5;

        // when
        let storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = expectedBedrooms;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // then
        expect(fixture.debugElement.queryAll(By.css('.icon-bed')).length).toBe(expectedBedrooms);
    });
});
