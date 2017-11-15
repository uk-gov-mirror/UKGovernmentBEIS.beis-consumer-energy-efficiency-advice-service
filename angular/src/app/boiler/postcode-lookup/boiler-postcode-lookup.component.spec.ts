import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerPostcodeLookupComponent} from "./boiler-postcode-lookup.component";

describe('BoilerPostcodeLookupComponent', () => {
    let component: BoilerPostcodeLookupComponent;
    let fixture: ComponentFixture<BoilerPostcodeLookupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerPostcodeLookupComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerPostcodeLookupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
