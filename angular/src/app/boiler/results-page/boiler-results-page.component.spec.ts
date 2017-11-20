import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerResultsPageComponent} from "./boiler-results-page.component";

describe('BoilerResultsPageComponent', () => {
    let component: BoilerResultsPageComponent;
    let fixture: ComponentFixture<BoilerResultsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerResultsPageComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerResultsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
