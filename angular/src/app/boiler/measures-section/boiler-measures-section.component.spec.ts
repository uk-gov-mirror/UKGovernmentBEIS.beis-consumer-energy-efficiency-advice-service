import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerMeasuresSectionComponent} from "./boiler-measures-section.component";

describe('BoilerMeasuresSectionComponent', () => {
    let component: BoilerMeasuresSectionComponent;
    let fixture: ComponentFixture<BoilerMeasuresSectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerMeasuresSectionComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMeasuresSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
