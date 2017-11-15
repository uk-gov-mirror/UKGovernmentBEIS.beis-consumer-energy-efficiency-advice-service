import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MakeModelLookupComponent} from "./make-model-lookup.component";

describe('BoilerMakeModelLookupComponent', () => {
    let component: MakeModelLookupComponent;
    let fixture: ComponentFixture<MakeModelLookupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MakeModelLookupComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MakeModelLookupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
