import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerRegulationCardComponent} from "./boiler-regulation-card.component";

describe('BoilerRegulationCardComponent', () => {
    let component: BoilerRegulationCardComponent;
    let fixture: ComponentFixture<BoilerRegulationCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerRegulationCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerRegulationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
