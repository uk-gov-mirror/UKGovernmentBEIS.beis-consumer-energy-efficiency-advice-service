import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerMakeModelReplaceComponent} from "./boiler-make-model-replace.component";

describe('BoilerMakeModelReplaceComponent', () => {
    let component: BoilerMakeModelReplaceComponent;
    let fixture: ComponentFixture<BoilerMakeModelReplaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerMakeModelReplaceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMakeModelReplaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
