import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {FlatPositionQuestionComponent} from './flat-position-question.component';
import {ResponseData} from "../../../../../common/response-data/response-data";
import {FlatPosition} from "./flat-position";

describe('FlatPositionQuestionComponent', () => {
    let fixture: ComponentFixture<FlatPositionQuestionComponent>;
    let component: FlatPositionQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FlatPositionQuestionComponent ],
            providers: [ResponseData]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlatPositionQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a flat position', () => {
        // given

        // when
        let threeSidesExposed = fixture.debugElement.query(By.css('.three-sides-exposed'));
        threeSidesExposed.nativeElement.click();

        // then
        expect(component.response).toBe(FlatPosition.ThreeSidesExposed);
    });

    it('should notify of completion when clicking on a flat position', () => {
        // given

        // when
        let threeSidesExposed = fixture.debugElement.query(By.css('.three-sides-exposed'));
        threeSidesExposed.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
