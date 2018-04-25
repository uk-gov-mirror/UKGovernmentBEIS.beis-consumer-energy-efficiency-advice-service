import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Subject} from 'rxjs/Subject';
import {HeaderComponent} from './header.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserStateService} from '../../shared/user-state-service/user-state-service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {WordpressSearchService} from '../../shared/wordpress-search-service/wordpress-search.service';
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let injector: TestBed;

    const mockUserStateService = {getSessionReference: () => "reference"};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                SearchBarComponent,
                SpinnerAndErrorContainerComponent,
            ],
            imports: [FormsModule, RouterTestingModule, InlineSVGModule, HttpClientTestingModule],
            providers: [
                {provide: WordpressSearchService, useValue: {}},
                {provide: UserStateService, useValue: mockUserStateService},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
        injector = getTestBed();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        component.shouldCloseSearchBar = new Subject();
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });
});
