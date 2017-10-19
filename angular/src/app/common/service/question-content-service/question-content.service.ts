import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {Observable} from 'rxjs/Observable';
import {AllQuestionsContent} from '../../model/all-questions-content';
import {QuestionResponse} from '../../model/question-response';

@Injectable()
export class QuestionContentService {
    private static readonly questionsContentEndpoint = 'wp/v2/question';

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchQuestionsContent(): Observable<AllQuestionsContent> {
        const url = this.wordpressApiService.getFullApiEndpoint(QuestionContentService.questionsContentEndpoint);
        const questionResponses: Observable<QuestionResponse[]> = this.http.get(url);
        return questionResponses.map(questionResponses => new AllQuestionsContent(questionResponses));
    }
}