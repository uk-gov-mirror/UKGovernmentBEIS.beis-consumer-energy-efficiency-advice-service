import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";


import {BoilerReplacementCardComponent} from "./boiler-replacement-card.component";
import {BoilerType} from "../../boiler-types-service/boiler-type";

describe('BoilerReplacementCardComponent', () => {
    let component: BoilerReplacementCardComponent;
    let fixture: ComponentFixture<BoilerReplacementCardComponent>;
    const boilerType = new BoilerType(
        'Fake boiler',
        'This is not a real boiler',
        '/fake-page',
        100,
        300,
        20,
        1500,
    );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerReplacementCardComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerReplacementCardComponent);
        component = fixture.componentInstance;
        component.boilerType = boilerType;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
