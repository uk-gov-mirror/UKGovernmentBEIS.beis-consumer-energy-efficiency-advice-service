import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EpcResult} from "./epc-result";
import {AppSettings} from "../app-settings";

@Injectable()
export class PostcodeEpcService {
  constructor(private http: HttpClient) { }

  getEpcData(postcode: string, number: number): Observable<EpcResult> {
    const params = new HttpParams().set('postcode', postcode).set('number', number.toString());
    return this.http.get(AppSettings.WORDPRESS_API_ROOT + 'angular-theme/v1/postcode-epc', {params: params});
  }
}
