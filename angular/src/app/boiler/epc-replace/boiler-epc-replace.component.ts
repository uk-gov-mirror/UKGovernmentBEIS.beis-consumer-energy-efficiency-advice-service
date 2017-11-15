import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";

@Component({
    selector: 'app-boiler-epc-replace',
    templateUrl: './boiler-epc-replace.component.html',
    styleUrls: ['./boiler-epc-replace.component.scss']
})
export class BoilerEpcReplaceComponent implements OnInit {
    private lmkKey: string;
    loadingRecommendations: boolean = true;
    recommendationsString: string;

    constructor(private epcApiService: EpcApiService,
                private route: ActivatedRoute) {
        this.lmkKey = this.route.snapshot.paramMap.get('lmkKey');
    }

    ngOnInit() {
        this.epcApiService.getRecommendationsForLmkKey(this.lmkKey).subscribe(
            recs => this.handleRecommendationsResponse(recs),
            err => this.handleRecommendationsResponse(err)
        );
    }

    handleRecommendationsResponse(response) {
        console.log(response);
        this.loadingRecommendations = false;
        this.recommendationsString = JSON.stringify(response);
    }
}
