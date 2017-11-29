import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {HouseExposedWallQuestionComponent} from "./house-exposed-wall-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {HouseExposedWall} from "./house-exposed-wall";

describe('HouseExposedWallQuestionComponent', () => {
    let fixture: ComponentFixture<HouseExposedWallQuestionComponent>;
    let component: HouseExposedWallQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HouseExposedWallQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HouseExposedWallQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a wall sharing option', () => {
        // given

        // when
        let threeSidesExposed = fixture.debugElement.query(By.css('.one-side-shared'));
        threeSidesExposed.nativeElement.click();

        // then
        expect(component.response).toBe(HouseExposedWall.ThreeSidesExposed);
    });

    it('should notify of completion when clicking on a wall sharing option', () => {
        // given

        // when
        let threeSidesExposed = fixture.debugElement.query(By.css('.one-side-shared'));
        threeSidesExposed.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
