import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

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

    it('should display the correct total investment', () => {
        const investmentElement = fixture.debugElement.query(By.css('.investment .box-content')).nativeElement;
        expect(investmentElement.innerText).toEqual(`£${investment}`);
    });

    it('should display the correct total savings', () => {
        const savingsElement = fixture.debugElement.query(By.css('.savings .box-content')).nativeElement;
        expect(savingsElement.innerText).toEqual(`£${savings.toFixed(2)}`);
    });
});
