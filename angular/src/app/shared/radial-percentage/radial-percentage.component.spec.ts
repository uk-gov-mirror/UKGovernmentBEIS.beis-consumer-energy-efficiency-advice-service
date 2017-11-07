import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {RadialPercentageComponent} from "./radial-percentage.component";

describe('RadialPercentageComponent', () => {
    let component: RadialPercentageComponent;
    let fixture: ComponentFixture<RadialPercentageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RadialPercentageComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadialPercentageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
