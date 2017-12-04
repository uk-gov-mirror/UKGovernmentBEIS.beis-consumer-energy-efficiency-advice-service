import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FridgeFreezerQuestionComponent} from "./fridge-freezer-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FridgeFreezerQuestionComponent', () => {
    let component: FridgeFreezerQuestionComponent;
    let fixture: ComponentFixture<FridgeFreezerQuestionComponent>;
    let responseData: ResponseData;

    const originalNumberOfFridgeFreezers: number = 1;
    const originalNumberOfFreezers: number = 2;
    const originalNumberOfFridges: number = 3;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FridgeFreezerQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        responseData.numberOfFridgeFreezers = originalNumberOfFridgeFreezers;
        responseData.numberOfFridges = originalNumberOfFridges;
        responseData.numberOfFreezers = originalNumberOfFreezers;

        fixture = TestBed.createComponent(FridgeFreezerQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original numbers of fridge-freezers in response data', async(() => {
        fixture.whenStable().then(() => {
            let fridgeFreezersInput = fixture.debugElement.query(By.css('.fridge-freezer-input input')).nativeElement;
            expect(fridgeFreezersInput.value).toBe(originalNumberOfFridgeFreezers.toString());
        });
    }));

    it('should set the response given a valid number of fridge-freezers', () => {
        // given
        const expectedFridgeFreezers = 5;

        // when
        let fridgeFreezersInput = fixture.debugElement.query(By.css('.fridge-freezer-input input')).nativeElement;
        fridgeFreezersInput.value = expectedFridgeFreezers;
        fridgeFreezersInput.dispatchEvent(new Event('input'));

        // then
        expect(responseData.numberOfFridgeFreezers).toBe(expectedFridgeFreezers);
    });

    it('should populate with original numbers of fridges in response data', async(() => {
        fixture.whenStable().then(() => {
            let fridgesInput = fixture.debugElement.query(By.css('.fridge-input input')).nativeElement;
            expect(fridgesInput.value).toBe(originalNumberOfFridges.toString());
        });
    }));

    it('should set the response given a valid number of fridges', () => {
        // given
        const expectedFridges = 5;

        // when
        let fridgesInput = fixture.debugElement.query(By.css('.fridge-input input')).nativeElement;
        fridgesInput.value = expectedFridges;
        fridgesInput.dispatchEvent(new Event('input'));

        // then
        expect(responseData.numberOfFridges).toBe(expectedFridges);
    });

    it('should populate with original numbers of fridge-freezers in response data', async(() => {
        fixture.whenStable().then(() => {
            let freezersInput = fixture.debugElement.query(By.css('.freezer-input input')).nativeElement;
            expect(freezersInput.value).toBe(originalNumberOfFreezers.toString());
        });
    }));

    it('should set the response given a valid number of fridge-freezers', () => {
        // given
        const expectedFreezers = 5;

        // when
        let freezersInput = fixture.debugElement.query(By.css('.freezer-input input')).nativeElement;
        freezersInput.value = expectedFreezers;
        freezersInput.dispatchEvent(new Event('input'));

        // then
        expect(responseData.numberOfFreezers).toBe(expectedFreezers);
    });

});
