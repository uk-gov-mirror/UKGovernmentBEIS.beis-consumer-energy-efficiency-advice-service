import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {BoilerRegulation} from './boiler-regulation-card/boiler-regulation-card.component';
import includes from 'lodash-es/includes';

@Component({
    selector: 'app-boiler-advice-page',
    templateUrl: './boiler-advice-page.component.html',
    styleUrls: ['./boiler-advice-page.component.scss']
})
export class BoilerAdvicePageComponent implements OnInit {

    loading = true;
    error = false;
    boilerSlug: string;
    boilerType: BoilerType;

    private static readonly GAS_BOILERS = ['combi-boiler', 'system-boiler', 'regular-boiler'];
    private static readonly BOILER_REGULATIONS: BoilerRegulation[] = [
        {
            headline: 'Weather compensators',
            summary: 'A weather compensator can reduce the heat output of the boiler to correspond to different external \
                temperatures so that less fuel is consumed to achieve the desired thermal comfort.',
            efficiencyImprovement: 0.7,
        },
        {
            headline: 'Load compensators',
            summary: 'Load compensation adjusts the flow temperature of the heating system in a similar manner to weather compensation.',
            efficiencyImprovement: 0.7,
        },
        {
            headline: 'Flue Gas Heat Recovery (FGHR)',
            summary: 'Flue Gas Heat Recovery (FGHR) is the extraction of waste heat from the products of combustion (flue gases) \
                which can then be used for the purpose of pre-heating domestic hot water (DHW).',
            efficiencyImprovement: 2.93,
        }
    ];

    constructor(private boilerTypesService: BoilerTypesService,
                private route: ActivatedRoute) {
        this.boilerSlug = route.snapshot.paramMap.get('slug');
    }

    ngOnInit() {
        this.boilerTypesService.fetchBoilerTypes().subscribe(
            boilerTypes => this.setBoilerTypeFrom(boilerTypes),
            err => this.handleError(err),
            () => this.loading = false,
        );
    }

    get boilerRegulations() {
        return BoilerAdvicePageComponent.BOILER_REGULATIONS;
    }

    isGasBoiler(): boolean {
        return includes(BoilerAdvicePageComponent.GAS_BOILERS, this.boilerSlug);
    }

    private setBoilerTypeFrom(boilerTypes: BoilerType[]) {
        this.boilerType = boilerTypes.find(boilerType => boilerType.slug === this.boilerSlug);
    }

    private handleError(err) {
        console.error(err);
        this.error = true;
        this.loading = false;
    }
}
