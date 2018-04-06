import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NationalGrantContent} from './national-grants-content';
import Config from '../../config';

@Injectable()
export class NationalGrantsContentService {
    private readonly nationalGrantsEndpoint = Config().apiRoot + '/national-grants';
    private nationalGrantsContent: Observable<NationalGrantContent[]>;

    constructor(private http: HttpClient) {
    }

    static getContentForGrant(grantsContent: NationalGrantContent[], grantId: string) {
        const grantContent = grantsContent.find(grant => grant.slug === grantId);
        if (!grantContent) {
            console.warn(`No content found for grant with id "${grantId}"`);
            return null;
        }
        return grantContent;
    }

    fetchNationalGrantsContent(): Observable<NationalGrantContent[]> {
        if (!this.nationalGrantsContent) {
            this.nationalGrantsContent = this.http.get<NationalGrantContent[]>(
                this.nationalGrantsEndpoint)
                .shareReplay(1);
        }
        return this.nationalGrantsContent;
    }
}
