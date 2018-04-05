import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {YourHomeContent} from "./your-home-content";

@Component({
    selector: 'app-your-home',
    templateUrl: './your-home.component.html',
    styleUrls: ['./your-home.component.scss']
})
export class YourHomeComponent implements OnInit {

    isLoading: boolean;
    isError: boolean;
    tag: string;
    yourHomeContent: YourHomeContent;
    measures: String[];

    heatingAndHotwater: YourHomeContent = {
        tag: 'heating&hot-water',
        title: 'Heating & Hotwater',
        text: 'Heating your home can be expensive. Here are a few options for reducing the overall costs.',
    };

    windowsAndDoors: YourHomeContent = {
        tag: 'windows&doors',
        title: 'Windows & Doors',
        text: 'Double glazing and draught excluders keep the cold out and keep your home warm for less.',
    };

    floorsWallsAndRoofs: YourHomeContent = {
        tag: 'floors-walls&roofs',
        title: 'Floors, Walls & Roofs',
        text: 'Simple measures like loft insulation can make a huge impact.',
    };

    solarEnergy: YourHomeContent = {
        tag: 'solar-energy',
        title: 'Solar Energy',
        text: 'Solar panels are a good long term investment and are easy to have installed if your house is suitable.',
    };

    constructor(private route: ActivatedRoute,
                private measureService: EnergySavingMeasureContentService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.tag = params.get('tag');
            this.yourHomeContent = this.getHomeContent(this.tag);
        });

        this.measureService.fetchMeasureDetails()
            .subscribe(
                measures => this.measures = measures.map(measure => measure.acf.headline)
            );

    }

    private getHomeContent(tag: string) {
        switch (tag) {
            case this.heatingAndHotwater.tag:
                return this.heatingAndHotwater;
            case this.windowsAndDoors.tag:
                return this.windowsAndDoors;
            case this.floorsWallsAndRoofs.tag:
                return this.floorsWallsAndRoofs;
            case this.solarEnergy.tag:
                return this.solarEnergy;
        }
    }


}
