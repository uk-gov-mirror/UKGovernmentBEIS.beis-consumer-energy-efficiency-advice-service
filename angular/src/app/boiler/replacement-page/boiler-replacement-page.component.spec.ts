import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerReplacementPageComponent} from "./boiler-replacement-page.component";

describe('BoilerReplacementPageComponent', () => {
    let component: BoilerReplacementPageComponent;
    let fixture: ComponentFixture<BoilerReplacementPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerReplacementPageComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerReplacementPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
