import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';

import {BoilerAdvicePageComponent} from './boiler-advice-page.component';
import {BoilerRegulationCardComponent} from './boiler-regulation-card/boiler-regulation-card.component';
import {SpinnerAndErrorContainerComponent} from '../../shared/spinner-and-error-container/spinner-and-error-container.component';
import {BoilerTypeMetadataResponse} from '../boiler-types-service/boiler-type-metadata-response';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerLinkButtonComponent} from '../boiler-link-button/boiler-link-button.component';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

describe('BoilerAdvicePageComponent', () => {
    let component: BoilerAdvicePageComponent;
    let fixture: ComponentFixture<BoilerAdvicePageComponent>;

    const boilerTypesResponse = require('assets/test/boiler-types-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
            .map((response: BoilerTypeMetadataResponse[]) => response.map(boiler => BoilerType.fromMetadata(boiler)))
    };

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerAdvicePageComponent,
                SpinnerAndErrorContainerComponent,
                BoilerRegulationCardComponent,
                BoilerLinkButtonComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerAdvicePageComponent);
        spyOn(TestBed.get(BoilerTypesService), 'fetchBoilerTypes').and.callThrough();
        component = fixture.componentInstance;
        component.boilerSlug = 'combi-boiler';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the boiler types service', () => {
        expect(TestBed.get(BoilerTypesService).fetchBoilerTypes).toHaveBeenCalled();
    });

    it('should set the boiler type based on the response', () => {
        expect(component.boilerType).toEqual(boilerWithSlug(component.boilerSlug));
    });

    it('should show the right boiler description', () => {
        const descriptionElement = fixture.debugElement.query(By.css('.description')).nativeElement;
        expect(descriptionElement.innerText).toEqual(component.boilerType.description);
    });

    it('should show the right boiler installation cost', () => {
        const installationCostElement = fixture.debugElement.query(By.css('.installation .value')).nativeElement;
        expect(installationCostElement.innerText)
            .toEqual(`£${component.boilerType.installationCostLower}-£${component.boilerType.installationCostUpper}`);
    });

    it('should show the right boiler lifetime expectancy', () => {
        const lifetimeElement = fixture.debugElement.query(By.css('.lifetime .value')).nativeElement;
        expect(lifetimeElement.innerText).toEqual(`${component.boilerType.lifetimeYears} years`);
    });

    it('should show the right boiler space requirement', () => {
        const spaceElement = fixture.debugElement.query(By.css('.space .value')).nativeElement;
        expect(spaceElement.innerText).toEqual(component.boilerType.spaceRequirement);
    });

    it('should not show the pros section if there are no pros', () => {
        // given
        component.boilerType.pros = [];

        // when
        fixture.detectChanges();

        // then
        expect(prosSection()).toBeFalsy();
    });

    it('should show the pros section if there are pros, with the pros listed', () => {
        // given
        component.boilerType.pros = [
            {heading: 'heading1', body: 'body1'},
            {heading: 'heading2', body: 'body2'},
            {heading: 'heading3', body: 'body3'},
        ];

        // when
        fixture.detectChanges();
        const actualProHeadings = Array.from(fixture.debugElement.queryAll(By.css('.pro .heading-text')))
            .map(pro => pro.nativeElement.innerText);
        const actualProBodies = Array.from(fixture.debugElement.queryAll(By.css('.pro .body-text')))
            .map(pro => pro.nativeElement.innerText);

        // then
        expect(actualProHeadings).toEqual(component.boilerType.pros.map(pro => pro.heading));
        expect(actualProBodies).toEqual(component.boilerType.pros.map(pro => pro.body));
    });

    it('should not show the cons section if there are no cons', () => {
        // given
        component.boilerType.cons = [];

        // when
        fixture.detectChanges();

        // then
        expect(consSection()).toBeFalsy();
    });

    it('should show the cons section if there are cons, with the cons listed', () => {
        // given
        component.boilerType.cons = [
            {heading: 'heading1', body: 'body1'},
            {heading: 'heading2', body: 'body2'},
            {heading: 'heading3', body: 'body3'},
        ];

        // when
        fixture.detectChanges();
        const actualConHeadings = Array.from(fixture.debugElement.queryAll(By.css('.con .heading-text')))
            .map(con => con.nativeElement.innerText);
        const actualConBodies = Array.from(fixture.debugElement.queryAll(By.css('.con .body-text')))
            .map(con => con.nativeElement.innerText);

        // then
        expect(actualConHeadings).toEqual(component.boilerType.cons.map(con => con.heading));
        expect(actualConBodies).toEqual(component.boilerType.cons.map(con => con.body));
    });

    const prosSection = () => fixture.debugElement.query(By.css('.pros'));
    const consSection = () => fixture.debugElement.query(By.css('.cons'));
    const regulationsSection = () => fixture.debugElement.query(By.css('.regulations'));
    const boilerWithSlug = slug => BoilerType.fromMetadata(boilerTypesResponse.find(metadata => metadata.slug === slug));
});
