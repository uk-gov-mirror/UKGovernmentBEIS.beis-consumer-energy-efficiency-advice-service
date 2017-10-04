import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {PageComponent} from './page.component';
import {PageService} from './page.service';
import {Page} from "./page";

describe('PageComponent', () => {
    let component: PageComponent;
    let fixture: ComponentFixture<PageComponent>;

    let expectedPage = new Page();
    let pageServiceStub = {
        getPage: () => Observable.of(expectedPage)
    };

    const routeParam = 'test-page';

    beforeEach(async(() => {
        spyOn(pageServiceStub, 'getPage').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [PageComponent],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    paramMap: Observable.of({get: () => routeParam})
                }
            }]
        })
            .overrideComponent(PageComponent, {
                set: {
                    providers: [{provide: PageService, useValue: pageServiceStub}]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the PageService with the route param', () => {
        expect(pageServiceStub.getPage).toHaveBeenCalledWith(routeParam);
        expect(component.pageData).toBe(expectedPage);
    })
});
