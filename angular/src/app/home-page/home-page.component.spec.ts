import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {HomePageComponent} from "./home-page.component";
import {LatestNewsCardComponent} from "../common/latest-news-card/latest-news-card.component";
import {NavigationBarComponent} from "../common/navigation-bar/navigation-bar.component";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomePageComponent, LatestNewsCardComponent, NavigationBarComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
