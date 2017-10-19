import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {FlatPositionQuestionComponent} from './flat-position-question.component';
import {ResponseData} from "../../../response-data/response-data";
import {FlatPosition} from "./flat-position";

describe('FlatPositionQuestionComponent', () => {
    let fixture: ComponentFixture<FlatPositionQuestionComponent>;
    let component: FlatPositionQuestionComponent;

    const responseData: ResponseData = new ResponseData();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FlatPositionQuestionComponent ],
            providers: [{provide: ResponseData, useValue: responseData}]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlatPositionQuestionComponent);
        component = fixture.componentInstance;
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
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
        expect(responseData.flatPosition).toBe(FlatPosition.ThreeSidesExposed);
    });

    it('should notify of completion when clicking on a flat position', () => {
        // given

        // when
        let threeSidesExposed = fixture.debugElement.query(By.css('.three-sides-exposed'));
        threeSidesExposed.nativeElement.click();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});
