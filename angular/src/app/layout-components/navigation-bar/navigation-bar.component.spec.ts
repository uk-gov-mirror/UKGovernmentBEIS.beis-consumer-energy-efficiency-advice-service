import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';
import {NavigationBarComponent} from './navigation-bar.component';
import {Observable} from 'rxjs/Observable';
import {RouterTestingModule} from '@angular/router/testing';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {NavBarSuboptionComponent} from './nav-bar-suboption/nav-bar-suboption.component';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {WordpressSearchService} from '../../shared/wordpress-search-service/wordpress-search.service';

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;

    const mockWordpressPagesService = {
        fetchTopLevelPages: () => Observable.of([])
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NavigationBarComponent,
                NavBarSuboptionComponent,
                SearchBarComponent],
            imports: [RouterTestingModule,
                InlineSVGModule,
                FormsModule
            ],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                {provide: WordpressSearchService, useValue: {}},
                {provide: RecommendationsService, useValue: {}},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationBarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
