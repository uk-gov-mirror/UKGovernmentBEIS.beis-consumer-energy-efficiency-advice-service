import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Page } from './page'

@Injectable()
export class PageService {
  private static pagesEndpoint = 'http://localhost:81/wp-json/wp/v2/pages';

  constructor(private http: HttpClient) { }

  getPage(slug: string): Observable<Page> {
    return this.http
        .get(PageService.pagesEndpoint + `?per_page=1&slug=${slug}`)
        .map((pages: Page[]) => pages.length === 1 ? pages[0] : null);
  }
}
