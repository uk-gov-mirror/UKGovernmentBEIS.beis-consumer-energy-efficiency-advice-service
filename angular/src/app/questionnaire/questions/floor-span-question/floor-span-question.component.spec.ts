import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FloorSpanQuestionComponent} from "./floor-span-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {FloorLevel} from "../floor-level-question/floor-level";
import {FormsModule} from "@angular/forms";
import {keys} from "lodash-es";

describe('FloorSpanQuestionComponent', () => {
    let fixture: ComponentFixture<FloorSpanQuestionComponent>;
    let component: FloorSpanQuestionComponent;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FloorSpanQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FloorSpanQuestionComponent);
        component = fixture.componentInstance;
        responseData = TestBed.get(ResponseData);
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original floor levels in response data checked', async(() => {
        // given
        const originalFloorLevels: FloorLevel[] = [FloorLevel.Basement, FloorLevel.TopFloor];
        const allFloorLevels: FloorLevel[] = keys(FloorLevel)
            .map(x => parseInt(x))
            .filter(floorLevel => !isNaN(floorLevel));

        // when
        responseData.floorLevels = originalFloorLevels;
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() =>
            allFloorLevels.forEach(floorLevel => {
                const checkbox = fixture.debugElement.query(By.css(`#floor-span-checkbox-${FloorLevel[floorLevel]}`)).nativeElement;
                expect(checkbox.classList.contains('selected')).toBe(originalFloorLevels.includes(floorLevel));
            })
        );
    }));

    it('should set response data when clicking on a floor level', async(() => {
        fixture.whenStable().then(() => {
            // given

            // when
            const basement = fixture.debugElement.query(By.css('#floor-span-checkbox-Basement'));
            basement.nativeElement.click();

            // then
            expect(responseData.floorLevels).toEqual([FloorLevel.Basement]);
        })
    }));

    it('should set response data when clicking on multiple floor level', async(() => {
        fixture.whenStable().then(() => {
            // given

            // when
            const basement = fixture.debugElement.query(By.css('#floor-span-checkbox-Basement'));
            basement.nativeElement.click();
            const ground = fixture.debugElement.query(By.css('#floor-span-checkbox-Ground'));
            ground.nativeElement.click();

            // then
            expect(responseData.floorLevels).toEqual([FloorLevel.Basement, FloorLevel.Ground]);
        })
    }))
});
