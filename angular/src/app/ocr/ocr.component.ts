import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-ocr',
    templateUrl: './ocr.component.html',
    styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit {
    result: Observable<string>;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];

            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);

            this.result = this.http.post('/wp-json/angular-theme/v1/ocr', formData);
        }
    }
}
