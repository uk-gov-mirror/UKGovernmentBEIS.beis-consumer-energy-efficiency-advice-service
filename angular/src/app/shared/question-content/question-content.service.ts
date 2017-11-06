import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/shareReplay";
import {AllQuestionsContent} from "./all-questions-content";
import {QuestionResponse} from "./question-response";

@Injectable()
export class QuestionContentService {
    private static readonly questionsContentEndpoint = 'acf/v3/question';
    private questionsContent: Observable<AllQuestionsContent>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    public fetchQuestionsContent(): Observable<AllQuestionsContent> {
        if (!this.questionsContent) {
            const params = new HttpParams().set('per_page', '1000');
            const url = this.wordpressApiService.getFullApiEndpoint(QuestionContentService.questionsContentEndpoint);
            const questionResponses: Observable<QuestionResponse[]> = this.http.get(url, {params: params});
            this.questionsContent = questionResponses.map(questionResponses => new AllQuestionsContent(questionResponses)).shareReplay(1);
        }
        return this.questionsContent;
    }
}
