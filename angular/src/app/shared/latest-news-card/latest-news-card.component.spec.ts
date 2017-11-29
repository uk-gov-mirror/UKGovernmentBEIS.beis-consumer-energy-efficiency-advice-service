import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {LatestNewsCardComponent} from "./latest-news-card.component";

describe('LatestNewsCardComponent', () => {
    let component: LatestNewsCardComponent;
    let fixture: ComponentFixture<LatestNewsCardComponent>;

    const heading = 'heading';
    const iconClassName = 'icon-class';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LatestNewsCardComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LatestNewsCardComponent);
        component = fixture.componentInstance;
        component.heading = heading;
        component.iconClassName = iconClassName;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        const headingElement = fixture.debugElement.query(By.css('.heading')).nativeElement;
        expect(headingElement.innerText).toEqual(heading);
    });

    it('should display the correct icon', () => {
        const iconElement = fixture.debugElement.query(By.css('.latest-news-icon-container span')).nativeElement;
        expect(iconElement.className).toEqual(iconClassName);
    });
});
