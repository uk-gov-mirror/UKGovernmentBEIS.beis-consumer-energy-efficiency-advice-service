import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {HeaderComponent} from './header.component';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {WordpressPageResponse} from '../../shared/wordpress-pages-service/wordpress-page-response';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WordpressMeasuresService} from '../../shared/wordpress-measures-service/wordpress-measures.service';
import {NeedHelpComponent} from "../../shared/need-help/need-help.component";
import {UserStateService} from "../../shared/user-state-service/user-state-service";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let injector: TestBed;

    const mockSearchResult: WordpressPageResponse[] = [
        {slug: 'page-1', title: {rendered: 'Test page 1'}, content: {rendered: 'Test page 1'}, acf: null},
        {slug: 'page-2', title: {rendered: 'Test page 2'}, content: {rendered: 'Test page 2'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 3'}, content: {rendered: 'Test page 3'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 4'}, content: {rendered: 'Test page 4'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 5'}, content: {rendered: 'Test page 5'}, acf: null}
    ];

    const mockWordpressPagesService = {searchPages: (searchString) => Observable.of(mockSearchResult)};
    const mockWordpressMeasuresService = {searchMeasures: (searchString) => Observable.of(mockSearchResult)};
    const mockUserStateService = {getSessionReference: () => "reference"};

    beforeEach(async(() => {
        spyOn(mockWordpressPagesService, 'searchPages').and.callThrough();
        spyOn(mockWordpressMeasuresService, 'searchMeasures').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                NeedHelpComponent
            ],
            imports: [FormsModule, RouterTestingModule, InlineSVGModule, HttpClientTestingModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                {provide: WordpressMeasuresService, useValue: mockWordpressMeasuresService},
                {provide: UserStateService, useValue: mockUserStateService},
            ]
        })
            .compileComponents();
        injector = getTestBed();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    function injectSearchCallbackAndDetectChanges(callback: (searchText: string) => Observable<WordpressPageResponse[]>) {
        const injectedSearchPageService = injector.get(WordpressPagesService);
        const injectedSearchMeasuresService = injector.get(WordpressMeasuresService);
        injectedSearchPageService.searchPages = callback;
        injectedSearchMeasuresService.searchMeasures = callback;
        fixture.detectChanges();
    }
});
