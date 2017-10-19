import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {FuelTypeQuestionComponent} from './fuel-type-question.component';
import {ResponseData} from '../../../response-data/response-data';
import {FuelType} from './fuel-type';

describe('FuelTypeQuestionComponent', () => {
    let fixture: ComponentFixture<FuelTypeQuestionComponent>;
    let component: FuelTypeQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FuelTypeQuestionComponent ],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelTypeQuestionComponent);
        component = fixture.componentInstance;
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a fuel type', () => {
        // given
        let solidFuel = fixture.debugElement.query(By.css('.solid-fuel'));

        // when
        solidFuel.nativeElement.click();

        // then
        expect(component.response).toBe(FuelType.SolidFuel);
    });

    it('should notify of completion when clicking on a fuel type', () => {
        // given
        let solidFuel = fixture.debugElement.query(By.css('.solid-fuel'));

        // when
        solidFuel.nativeElement.click();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});