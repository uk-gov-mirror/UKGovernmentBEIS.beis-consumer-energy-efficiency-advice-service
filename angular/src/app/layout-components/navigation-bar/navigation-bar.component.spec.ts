import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {NavigationBarComponent} from './navigation-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NavBarSuboptionComponent} from "./nav-bar-suboption/nav-bar-suboption.component";

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationBarComponent, NavBarSuboptionComponent],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
            ],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationBarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
