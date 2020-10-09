export class SessionService {

    static getFromSession(key: string): any {
        const sessionData = sessionStorage.getItem(key);
        if (sessionData) {
            return JSON.parse(sessionData);
        }
        return;
    }

    static saveToSession(key: string, value: object): void {
        if (SessionService.sessionStorageAvailable()) {
            sessionStorage.setItem(key, JSON.stringify(value));
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
