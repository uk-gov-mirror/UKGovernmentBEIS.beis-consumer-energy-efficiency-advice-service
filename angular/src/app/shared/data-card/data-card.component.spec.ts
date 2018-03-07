import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DataCardComponent} from './data-card.component';

describe('DataCardComponent', () => {
    let component: DataCardComponent;
    let fixture: ComponentFixture<DataCardComponent>;

    const heading = 'test heading';
    const value = '£123';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DataCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataCardComponent);
        component = fixture.componentInstance;
        component.heading = heading;
        component.value = value;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        const headingElement = fixture.debugElement.query(By.css('.heading')).nativeElement;
        expect(headingElement.innerText.toLowerCase()).toEqual(heading);
    });

    it('should display the correct value', () => {
        const valueElement = fixture.debugElement.query(By.css('.number-value')).nativeElement;
        expect(valueElement.innerText).toEqual(value);
    });
});
