import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FlatExposedWallQuestionComponent} from "./flat-exposed-wall-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {FlatPosition} from "./flat-position";

describe('FlatExposedWallQuestionComponent', () => {
    let fixture: ComponentFixture<FlatExposedWallQuestionComponent>;
    let component: FlatExposedWallQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlatExposedWallQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlatExposedWallQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a wall exposing position', () => {
        // given

        // when
        let threeSidesExposed = fixture.debugElement.query(By.css('.three-sides-exposed'));
        threeSidesExposed.nativeElement.click();

        // then
        expect(component.response).toBe(FlatPosition.ThreeSidesExposed);
    });

    it('should notify of completion when clicking on a wall exposing position', () => {
        // given

        // when
        let threeSidesExposed = fixture.debugElement.query(By.css('.three-sides-exposed'));
        threeSidesExposed.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
