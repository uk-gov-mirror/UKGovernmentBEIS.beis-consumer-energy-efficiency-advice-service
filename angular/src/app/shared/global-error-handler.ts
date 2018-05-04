import {ErrorHandler, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from "rxjs/Subscriber";
import * as log from 'loglevel';

/**
 * This is an Angular ErrorHandler which notices when a script error
 * occurs.
 *
 * We use this to show the user a generic error banner, to avoid the
 * situation where there has been a script error and the site just sits
 * there with no indication to the user that it has died.
 *
 * In the future, we could perhaps send the error details to a monitoring
 * service like NewRelic, but no need at present.
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    errorStream: Observable<any>;
    private errorStreamSubscribers: Subscriber<any>[] = [];

    constructor() {
        // Send script errors from outside Angular to our subscribers.
        //
        // The default error handlers will log the error to the browser console,
        // so we don't do any extra logging here.
        window.addEventListener("error",
            e => this.broadcastErrorToSubscribers(e));

        // Set up an Observable that other components can use to watch for new errors
        this.errorStream = Observable.create(
            subscriber => {

                this.errorStreamSubscribers.push(subscriber);

                function unsubscribe() {
                    this.errorStreamSubscribers =
                        this.errorStreamSubscribers.filter(x => x !== subscriber);
                }

                return unsubscribe;
            });
    }

    handleError(error: any) {
        this.broadcastErrorToSubscribers(error);

        log.error(error);

        // Rethrow the error otherwise it gets swallowed
        throw error;
    }

    private broadcastErrorToSubscribers(error: any) {
        this.errorStreamSubscribers.forEach(sub => sub.next(error));
    }
}
