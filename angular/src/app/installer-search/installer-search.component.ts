import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";


@Component({
    selector: 'app-installer-search',
    templateUrl: './installer-search.component.html',
    styleUrls: ['./installer-search.component.scss']
})
export class InstallerSearchComponent implements OnInit {

    measureCode = null;
    postcode = null;

    constructor(private route: ActivatedRoute,
                private responseData: ResponseData) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.measureCode = params["measure-code"];
            this.postcode = this.responseData.postcode;
        });
    }
}
