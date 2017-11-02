import {Injectable} from "@angular/core";
import {PageError} from './page-error';
import {Subject} from "rxjs/Subject";

@Injectable()
export class PageStateService {
    isLoadingChange: Subject<boolean> = new Subject<boolean>();
    pageErrorChange: Subject<PageError> = new Subject<PageError>();

    private static genericError: PageError = {
        heading: 'Oh no!',
        message: 'Something went wrong and we can\'t load this page right now. Please try again later.'
    };

    showLoading(): void {
        this.isLoadingChange.next(true);
        this.pageErrorChange.next(null);
    }

    showGenericErrorAndLogMessage(errorLog?: any): void {
        console.error(errorLog);
        this.isLoadingChange.next(false);
        this.pageErrorChange.next(PageStateService.genericError);
    }

    showLoadingComplete(): void {
        this.isLoadingChange.next(false);
        this.pageErrorChange.next(null);
    }
}