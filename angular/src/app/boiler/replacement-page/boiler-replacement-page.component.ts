import {Component, OnInit} from '@angular/core';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import sortBy from 'lodash-es/sortBy';
import {Router} from '@angular/router';
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";

@Component({
    selector: 'app-boiler-replacement-page',
    templateUrl: './boiler-replacement-page.component.html',
    styleUrls: ['./boiler-replacement-page.component.scss']
})
export class BoilerReplacementPageComponent implements OnInit {

    loading: boolean = true;
    error: boolean = false;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    boilers: BoilerType[];
    postcode: string;

    constructor(private boilerTypesService: BoilerTypesService, private router: Router) {
    }

    onPostcodeSelected(postcodeDetails: PostcodeDetails) {
        this.postcode = postcodeDetails.postcode;
    }

    onEpcSelected(lmkKey: string) {
        if (lmkKey) {
            this.router.navigate(['/boiler/epc-replace', lmkKey]);
        } else {
            this.router.navigate(['/boiler/epc-replace/unknown']);
        }
    }

    ngOnInit() {
        this.boilerTypesService.fetchBoilerTypes().subscribe(
            boilerTypes => this.boilers = sortBy(boilerTypes, type => +(type.averageInstallationCost)),
            err => this.handleError(err),
            () => this.loading = false,
        );
    }

    private handleError(err) {
        console.error(err);
        this.error = true;
        this.loading = false;
    }

}
