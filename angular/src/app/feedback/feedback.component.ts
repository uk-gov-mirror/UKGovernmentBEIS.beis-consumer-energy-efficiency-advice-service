import {Component} from "@angular/core";
import Config from '../config';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

    name: string;
    email: string;
    subject: string;
    message: string;

    isSubmitting: boolean = false;
    infoText: string = '';

    private readonly feedbackEndpoint = Config().apiRoot + '/feedback';

    constructor(private http: HttpClient) {
    }

    public submit() {
        this.isSubmitting = true;
        this.infoText = '';
        this.http.post(this.feedbackEndpoint, this.getEmailParams())
            .subscribe(
                () => {
                    this.infoText = 'Thanks for your feedback!';
                    this.isSubmitting = false;
                },
                () => {
                    this.infoText = 'Sorry, there was an error when submitting the feedback.';
                    this.isSubmitting = false;
                });
    }

    private getEmailParams() {
        return {
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message
        };
    }
}
