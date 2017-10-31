import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {LatestNewsCardComponent} from "./latest-news-card.component";

describe('LatestNewsCardComponent', () => {
    let component: LatestNewsCardComponent;
    let fixture: ComponentFixture<LatestNewsCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LatestNewsCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LatestNewsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
