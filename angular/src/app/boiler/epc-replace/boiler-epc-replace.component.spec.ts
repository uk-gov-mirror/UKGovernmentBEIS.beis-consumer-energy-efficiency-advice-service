import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerEpcReplaceComponent} from "./boiler-epc-replace.component";

describe('BoilerEpcReplaceComponent', () => {
    let component: BoilerEpcReplaceComponent;
    let fixture: ComponentFixture<BoilerEpcReplaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerEpcReplaceComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerEpcReplaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
