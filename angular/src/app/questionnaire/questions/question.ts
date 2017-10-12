import { Type } from '@angular/core';
import { QuestionBaseComponent } from "./question.component";

export class Question<S, T extends QuestionBaseComponent<S>> {
    private _response: S;

    constructor(public questionComponent: Type<T>) {
    }

    get response(): S {
        return this._response === undefined
            ? this._response = this.loadResponseFromStorage()
            : this._response;
    }

    set response(val: S) {
        this._response = val;
        this.saveResponseToStorage();
    }

    private loadResponseFromStorage(): S {
        // Code goes here to load this question's response from local storage.
        return undefined;
    }

    private saveResponseToStorage() {
        // Code goes here to save this question's response to local storage.
    }
}
