/*
    Provides helper functions to read from/ write to the browser session storage.
    Data is persisted if the browser window and tab remain open. If the page is refreshed
    the data remains in the session. Once the tab or browser is closed, the session
    data is cleared.
*/
export class SessionService {

    // It is the callers responsibility to ensure that sessionStorage is available
    // by calling sessionStorageAvailable.
    // Returns null if the key doesn't exist
    static getFromSession(key: string): any {
        const sessionData = sessionStorage.getItem(key);
        return JSON.parse(sessionData);
    }

    static saveToSession(key: string, value: object): void {
        if (SessionService.sessionStorageAvailable()) {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }

    static removeFromSession(key: string): void {
        if (SessionService.sessionStorageAvailable()) {
            sessionStorage.removeItem(key);
        }
    }

    // Simplified version of
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
    static sessionStorageAvailable(): boolean {
            try {
                const x = '__storage_test__';
                sessionStorage.setItem(x, x);
                sessionStorage.removeItem(x);
                return true;
            } catch (e) {
                return false;
            }
    }
}
