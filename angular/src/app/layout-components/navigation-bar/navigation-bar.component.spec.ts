import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';
import {NavigationBarComponent} from './navigation-bar.component';
import {Observable} from 'rxjs/Observable';
import {RouterTestingModule} from '@angular/router/testing';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {WordpressPageResponse} from '../../shared/wordpress-pages-service/wordpress-page-response';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {WordpressMeasuresService} from "../../shared/wordpress-measures-service/wordpress-measures.service";
import {NavBarSuboptionComponent} from "./nav-bar-suboption/nav-bar-suboption.component";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;

    const mockSearchResult: WordpressPageResponse[] = [
        {slug: 'page-1', title: {rendered: 'Test page 1'}, content: {rendered: 'Test page 1'}, acf: null},
        {slug: 'page-2', title: {rendered: 'Test page 2'}, content: {rendered: 'Test page 2'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 3'}, content: {rendered: 'Test page 3'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 4'}, content: {rendered: 'Test page 4'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 5'}, content: {rendered: 'Test page 5'}, acf: null}
    ];

    const mockWordpressPagesService = {
        fetchTopLevelPages: () => Observable.of([])
    };
    const mockWordpressMeasuresService = {searchMeasures: (searchString) => Observable.of(mockSearchResult)};

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
                {provide: WordpressMeasuresService, useValue: mockWordpressMeasuresService},
                {provide: RecommendationsService, useValue: {}},
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
