import {Injectable} from "@angular/core";
import {PageError} from './page-error';

@Injectable()
export class PageStateService {
    isLoading: boolean;
    pageError: PageError;

    private static genericError: PageError = {
        heading: 'Oh no!',
        message: 'Something went wrong and we can\'t load this page right now. Please try again later.'
    };

    showLoading() {
        this.isLoading = true;
        this.pageError = null;
    }

    showGenericErrorAndLogMessage(errorLog?: any) {
        console.error(errorLog);
        this.isLoading = false;
        this.pageError = PageStateService.genericError;
    }

    showLoadingComplete() {
        this.isLoading = false;
        this.pageError = null;
    }
}