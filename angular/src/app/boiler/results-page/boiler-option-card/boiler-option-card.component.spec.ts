import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoilerOptionCardComponent} from "./boiler-option-card.component";
import {BoilerType} from "../../boiler-types-service/boiler-type";

describe('BoilerOptionCardComponent', () => {
    let component: BoilerOptionCardComponent;
    let fixture: ComponentFixture<BoilerOptionCardComponent>;

    const boiler = new BoilerType(
        'Fake Boiler',
        'Fake description',
        '/no/path',
        'No space requirement',
        100,
        200,
        15,
        1000,
    );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerOptionCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerOptionCardComponent);
        component = fixture.componentInstance;
        component.boiler = boiler;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
