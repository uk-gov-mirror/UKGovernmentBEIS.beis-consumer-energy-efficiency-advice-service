import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";

import {StaticMeasureCardComponent} from './static-measure-card.component';
import {DataCardComponent} from "../../shared/data-card/data-card.component";

describe('StaticMeasureCardComponent', () => {
    let component: StaticMeasureCardComponent;
    let fixture: ComponentFixture<StaticMeasureCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                StaticMeasureCardComponent,
                DataCardComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StaticMeasureCardComponent);
        component = fixture.componentInstance;
        component.measure = {
            averageSavings: 1,
            measureSummary: 'summary',
            measureHeadline: 'measure headline',
            basicInfoValue: '245%',
            basicInfoHeadline: 'headline',
            iconClassName: 'test-class'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('displays inputted values', () => {
        // given
        const headline = 'test headline';

        // when
        component.measure.basicInfoHeadline = headline;
        fixture.detectChanges();

        // then
        let headlingElement = fixture.debugElement.query(By.css('.basic-info .heading'));
        expect(headlingElement.nativeElement.innerText).toBe(headline);
    });
});
