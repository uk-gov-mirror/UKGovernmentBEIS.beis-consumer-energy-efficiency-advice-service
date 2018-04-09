import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {YourHomeContent} from "./your-home-content";
import {RawMeasureContent} from "../shared/energy-saving-measure-content-service/measure-content";

@Component({
    selector: 'app-your-home',
    templateUrl: './your-home.component.html',
    styleUrls: ['./your-home.component.scss']
})
export class YourHomeComponent implements OnInit {
    isLoading: boolean;
    isError: boolean;
    parameterString: string;
    yourHomeContent: YourHomeContent;
    measures: RawMeasureContent[];

    heatingAndHotwater: YourHomeContent = {
        parameterString: 'heating&hot-water',
        tag: 'tag_heating&hot-water',
        title: 'Heating & Hotwater',
        text: 'Heating your home can be expensive. Here are a few options for reducing the overall costs.',
    };

    windowsAndDoors: YourHomeContent = {
        parameterString: 'windows&doors',
        tag: 'tag_windows&doors',
        title: 'Windows & Doors',
        text: 'Double glazing and draught excluders keep the cold out and keep your home warm for less.',
    };

    floorsWallsAndRoofs: YourHomeContent = {
        parameterString: 'floors-walls&roofs',
        tag: 'tag_floors-walls&roofs',
        title: 'Floors, Walls & Roofs',
        text: 'Simple measures like loft insulation can make a huge impact.',
    };

    solarEnergy: YourHomeContent = {
        parameterString: 'solar-energy',
        tag: 'tag_solar-energy',
        title: 'Solar Energy',
        text: 'Solar panels are a good long term investment and are easy to have installed if your house is suitable.',
    };

    constructor(private route: ActivatedRoute,
                private measureService: EnergySavingMeasureContentService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.parameterString = params.get('tag');
            this.yourHomeContent = this.getHomeContent(this.parameterString);
            this.measureService.fetchMeasureDetails().subscribe(measures => {
                this.measures = this.filterMeasures(measures);
            });
        });
    }

    private getHomeContent(parameterString: string) {
        switch (parameterString) {
            case this.heatingAndHotwater.parameterString:
                return this.heatingAndHotwater;
            case this.windowsAndDoors.parameterString:
                return this.windowsAndDoors;
            case this.floorsWallsAndRoofs.parameterString:
                return this.floorsWallsAndRoofs;
            case this.solarEnergy.parameterString:
                return this.solarEnergy;
        }
    }

    private filterMeasures(measures: RawMeasureContent[]) {
        return measures.filter(measure =>
            measure.acf.tags && measure.acf.tags.some((tag) => tag === this.yourHomeContent.tag));
    }
}
