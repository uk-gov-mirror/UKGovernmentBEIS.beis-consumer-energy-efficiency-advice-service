import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../common/wordpress-api-service/wordpress-api-service";

@Component({
    selector: 'app-ocr',
    templateUrl: './ocr.component.html',
    styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit {
    private static readonly ocrEndpoint = 'angular-theme/v1/ocr';
    result: Observable<string>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    ngOnInit() {
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];

            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);

            this.result = this.http.post(this.wordpressApiService.getFullApiEndpoint(OcrComponent.ocrEndpoint), formData);
        }
    }
}
