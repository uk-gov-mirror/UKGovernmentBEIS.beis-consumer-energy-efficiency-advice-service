import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';
import {ResponseData} from '../../../shared/response-data/response-data';
import {FloorAreaQuestionComponent} from './floor-area-question.component';
import {FloorAreaUnit} from "./floor-area-unit";
import {Epc} from "../../../shared/postcode-epc-service/model/epc";

describe('FloorAreaQuestionComponent', () => {
    let component: FloorAreaQuestionComponent;
    let fixture: ComponentFixture<FloorAreaQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FloorAreaQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(FloorAreaQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set floor area when inputting a value', async(() => {
        fixture.whenStable().then(() => {
            // given
            const expectedArea = 100;

            // when
            const input = fixture.debugElement.query(By.css('#floor-area-input'));
            input.nativeElement.value = expectedArea;
            input.nativeElement.dispatchEvent(new Event('input'));

            // then
            expect(responseData.floorArea).toBe(expectedArea);
            expect(responseData.floorAreaUnit).toBe(component.floorAreaUnits[0].value);
        });
    }));

    it('should set floor area to 0 and notify of completion when clicking "I don\'t know".', () => {
        // given

        // when
        const button = fixture.debugElement.query(By.css('#do-not-know-button'));
        button.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
        expect(responseData.floorArea).toBe(0);
    });

    it('should set floor area unit to square foot when clicking the unit', () => {
        // given

        // when
        fixture.whenStable().then(() => {
            const squareFootUnitButton = fixture.debugElement.query(By.css('.unit-option.square-foot'));
            squareFootUnitButton.nativeElement.click();

            // then
            expect(responseData.floorAreaUnit).toBe(component.floorAreaUnits[1].value);
        });
    });

    it('should prepopulate floor area from EPC when EPC is available', () => {
        // given
        thereIsEpcWithTotalFloorArea(50);
        responseData.floorArea = undefined;
        const expectedTotalFloorArea = 50;

        // when
        component.ngOnInit();

        // then
        fixture.whenStable().then(() => {
            expect(responseData.floorArea).toBe(expectedTotalFloorArea);
            expect(responseData.floorAreaUnit).toBe(FloorAreaUnit.SquareMetre);
        });
    });

    it('should prepopulate floor area as 0 when EPC is not available', () => {
        // given
        responseData.floorArea = undefined;
        const expectedTotalFloorArea = 0;

        // when
        component.ngOnInit();

        // then
        fixture.whenStable().then(() => {
            expect(responseData.floorArea).toBe(expectedTotalFloorArea);
            expect(responseData.floorAreaUnit).toBe(FloorAreaUnit.SquareMetre);
        });
    });

    it('should not set floor area to value from EPC it has already been filled in', () => {
        // given
        responseData.floorArea = 80;
        thereIsEpcWithTotalFloorArea(50);
        const expectedTotalFloorArea = 80;

        // when
        component.ngOnInit();

        // then
        fixture.whenStable().then(() => {
            expect(responseData.floorArea).toBe(expectedTotalFloorArea);
        });
    });

    it('should not set floor area to value to 0 when EPC is not available and it has already been filled in', () => {
        // given
        responseData.floorArea = 80;
        const expectedTotalFloorArea = 80;

        // when
        component.ngOnInit();

        // then
        fixture.whenStable().then(() => {
            expect(responseData.floorArea).toBe(expectedTotalFloorArea);
        });
    });

    function thereIsEpcWithTotalFloorArea(totalFloorArea: number) {
        responseData.epc = {
            'totalFloorArea' : totalFloorArea.toString()
        } as Epc;
    }
});
