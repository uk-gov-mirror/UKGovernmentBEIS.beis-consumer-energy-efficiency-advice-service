import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PageComponent } from './page.component';
import { PageService } from './page.service';

describe('PageComponent', () => {
    let component:PageComponent;
    let fixture:ComponentFixture<PageComponent>;

    const expectedPage = {
        content: {
            rendered: 'test data'
        }
    };
    const pageServiceStub = {
        getPage: () => Observable.of(expectedPage)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageComponent],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    paramMap: Observable.of({get: () => 'test-page'})
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
});
