import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {CarouselItemComponent} from "./carousel-item.component";

describe('CarouselItemComponent', () => {
    let component: CarouselItemComponent;
    let fixture: ComponentFixture<CarouselItemComponent>;

    const number = 3;
    const summary = 'Some short summary';
    const details = 'Some longer details';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CarouselItemComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarouselItemComponent);
        component = fixture.componentInstance;
        component.number = number;
        component.summary = summary;
        component.details = details;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct number', () => {
        const numberElement = fixture.debugElement.query(By.css('.number')).nativeElement;
        expect(numberElement.innerText.length).toBeGreaterThanOrEqual(2);
        expect(+(numberElement.innerText)).toBe(number);
    });

    it('should display the correct summary', () => {
        const summaryElement = fixture.debugElement.query(By.css('.summary')).nativeElement;
        expect(summaryElement.innerText).toEqual(summary);
    });

    it('should display the correct details', () => {
        const detailsElement = fixture.debugElement.query(By.css('.details')).nativeElement;
        expect(detailsElement.innerText).toEqual(details);
    });
});
