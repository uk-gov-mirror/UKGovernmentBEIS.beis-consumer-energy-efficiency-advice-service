import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';

import { SuppliersPageComponent } from './suppliers-page.component';
import {WordpressSuppliersService} from "../shared/wordpress-suppliers-service/wordpress-suppliers.service";

describe('SuppliersPageComponent', () => {
    let component: SuppliersPageComponent;
    let fixture: ComponentFixture<SuppliersPageComponent>;
    const expectedSuppliers = [{
        name: 'British Gas',
        link: 'https://britishgas.co.uk'
    }];
    const wordpressSuppliersServiceStub = {
        fetchAllSuppliers: () => Observable.of(expectedSuppliers)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SuppliersPageComponent],
            providers: [
                {provide: WordpressSuppliersService, useValue: wordpressSuppliersServiceStub}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuppliersPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the supplier content with data from the SuppliersService', async(() => {
        // when
        fixture.detectChanges();

        // then
        fixture.whenStable()
            .then(() => {
                expect(fixture.debugElement.nativeElement.textContent).toContain(expectedSuppliers[0].name);
            });
    }));
});
