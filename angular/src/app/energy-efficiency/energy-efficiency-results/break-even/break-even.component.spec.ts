import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BreakEvenComponent} from './break-even.component';

describe('BreakEvenComponent', () => {
    let component: BreakEvenComponent;
    let fixture: ComponentFixture<BreakEvenComponent>;

    const investmentPounds = 1000;
    const costSavingPoundsPerYear = 100;
    const lifespanYears = 40;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BreakEvenComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreakEvenComponent);
        component = fixture.componentInstance;
        component.investmentPounds = investmentPounds;
        component.costSavingPoundsPerYear = costSavingPoundsPerYear;
        component.lifespanYears = lifespanYears;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct lifespan', () => {
        const lifespanElement = fixture.debugElement.query(By.css('.lifespan .data-value')).nativeElement;
        expect(lifespanElement.innerText).toEqual('40yrs');
    });

    it('should display the correct break-even point', () => {
        const breakEvenPointElement = fixture.debugElement.query(By.css('.break-even-point .data-value')).nativeElement;
        expect(breakEvenPointElement.innerText).toEqual('10yrs');
    });
});
