import {ChangeDetectorRef, Component, ErrorHandler, OnDestroy, OnInit} from '@angular/core';
import {GlobalErrorHandler} from "../shared/global-error-handler";
import {Subscription} from "rxjs/Subscription";

/**
 * A singleton error banner at the top of the page for catch-all error
 * display to the user.
 *
 * It might be nice to consolidate this with spinner-and-error-container
 * in the future, but currently they serve different functions
 * (this shows general script errors; that shows per-component errors).
 */
@Component({
    selector: 'app-error-banner',
    templateUrl: './error-banner.component.html',
    styleUrls: ['./error-banner.component.scss']
})
export class ErrorBannerComponent implements OnInit, OnDestroy {
    error: any = null;
    private changeDetectorRef: ChangeDetectorRef;
    private globalErrorHandler: GlobalErrorHandler;
    private errorStreamSubscription: Subscription;

    constructor(globalErrorHandler: ErrorHandler, changeDetectorRef: ChangeDetectorRef) {
        this.globalErrorHandler = globalErrorHandler as GlobalErrorHandler;
        this.changeDetectorRef = changeDetectorRef;
    }

    ngOnInit() {
        this.errorStreamSubscription = this.globalErrorHandler.errorStream
            .subscribe(error => {
                this.error = error;
                this.changeDetectorRef.detectChanges();
            });
    }

    ngOnDestroy() {
        if (this.errorStreamSubscription) {
            this.errorStreamSubscription.unsubscribe();
        }
    }

    dismissError() {
        this.error = null;
        this.changeDetectorRef.detectChanges();

    }
}
