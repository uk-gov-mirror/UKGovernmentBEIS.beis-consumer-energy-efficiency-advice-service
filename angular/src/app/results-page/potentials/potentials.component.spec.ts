import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PotentialsComponent} from "./potentials.component";
import {RadialPercentageComponent} from "../../shared/radial-percentage/radial-percentage.component";

describe('PotentialsComponent', () => {
    let component: PotentialsComponent;
    let fixture: ComponentFixture<PotentialsComponent>;

    const investment = 100;
    const savings = 50;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PotentialsComponent,
                RadialPercentageComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PotentialsComponent);
        component = fixture.componentInstance;
        component.totalInvestment = investment;
        component.totalSavings = savings;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
