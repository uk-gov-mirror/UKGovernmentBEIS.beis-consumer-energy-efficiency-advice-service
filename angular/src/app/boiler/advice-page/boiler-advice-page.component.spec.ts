import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerAdvicePageComponent} from "./boiler-advice-page.component";

describe('BoilerAdvicePageComponent', () => {
    let component: BoilerAdvicePageComponent;
    let fixture: ComponentFixture<BoilerAdvicePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerAdvicePageComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerAdvicePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
