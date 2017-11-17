import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerMakeModelLookupComponent} from "./boiler-make-model-lookup.component";

describe('BoilerMakeModelLookupComponent', () => {
    let component: BoilerMakeModelLookupComponent;
    let fixture: ComponentFixture<BoilerMakeModelLookupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerMakeModelLookupComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMakeModelLookupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
