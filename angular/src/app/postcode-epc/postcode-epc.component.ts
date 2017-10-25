import {Component, OnInit} from "@angular/core";
import {PostcodeEpcService} from "./api-service/postcode-epc.service";
import {EpcParserService} from "./epc-parser-service/epc-parser.service";
import {DisplayEpcRow} from "./epc-parser-service/display-epc-row";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-postcode-epc',
    templateUrl: './postcode-epc.component.html',
    styleUrls: ['./postcode-epc.component.scss'],
    providers: [PostcodeEpcService, EpcParserService]
})
export class PostcodeEpcComponent implements OnInit {
    postcode: string;
    number: number;

    result: Observable<DisplayEpcRow[]>;

    constructor(private postcodeEpcService: PostcodeEpcService, private epcParserService: EpcParserService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.result = this.postcodeEpcService.getEpcData(this.postcode, this.number)
            .map(result => this.epcParserService.parseToArray(result));
    }
}
