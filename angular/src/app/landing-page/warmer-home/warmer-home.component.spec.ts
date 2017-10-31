import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {WarmerHomeComponent} from "./warmer-home.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LatestNewsCardComponent} from "../../common/latest-news-card/latest-news-card.component";
import {LargeVideoCardComponent} from "../large-video-card/large-video-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../common/navigation-bar/navigation-bar.component";

describe('WarmerHomeComponent', () => {
    let component: WarmerHomeComponent;
    let fixture: ComponentFixture<WarmerHomeComponent>;

    class MockRouter {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WarmerHomeComponent,
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsCardComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
            ],
            providers: [{provide: Router, useClass: MockRouter}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WarmerHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
