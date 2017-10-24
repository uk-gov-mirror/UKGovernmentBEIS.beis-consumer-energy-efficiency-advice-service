import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import {AllQuestionsContent} from './all-questions-content';
import {QuestionResponse} from './question-response';

@Injectable()
export class QuestionContentService {
    private static readonly questionsContentEndpoint = 'wp/v2/question';
    private readonly questionsContent: Observable<AllQuestionsContent>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
        const url = this.wordpressApiService.getFullApiEndpoint(QuestionContentService.questionsContentEndpoint);
        const questionResponses: Observable<QuestionResponse[]> = this.http.get(url);
        this.questionsContent = questionResponses.map(questionResponses => new AllQuestionsContent(questionResponses)).shareReplay(1);
    }

    public fetchQuestionsContent(): Observable<AllQuestionsContent> {
        return this.questionsContent;
    }
}
