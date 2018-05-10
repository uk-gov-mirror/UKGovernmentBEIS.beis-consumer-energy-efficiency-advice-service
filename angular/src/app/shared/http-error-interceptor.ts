import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import * as log from 'loglevel';

/**
 * Add some extra logging to failed requests, particularly to log the
 * CloudFoundry request ID, which is otherwise fairly invisible.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .catch((err: HttpErrorResponse) => {

                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Log it:
                    log.error('Error in HttpRequest:', err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    const rid = err.headers.get("X-Vcap-Request-Id")
                        || err.headers.get("X-Request-Id");

                    log.error(
                        `HTTP backend returned code ${err.status}, request id was: ${rid}`);
                }

                // Propagate the error
                throw err;
            }) as Observable<HttpEvent<any>>;
    }
}
