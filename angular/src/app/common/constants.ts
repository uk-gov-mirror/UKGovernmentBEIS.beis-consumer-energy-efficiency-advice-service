import {Injectable} from "@angular/core";

@Injectable()
export abstract class Constants {
    constructor(public readonly ASSETS_ROOT: string) {
    }
}

export class AppConstants extends Constants {
    constructor() {
        super('/wp-content/themes/angular-theme/dist/assets');
    }
}

export class TestConstants extends Constants {
    constructor() {
        super('/assets');
    }
}
