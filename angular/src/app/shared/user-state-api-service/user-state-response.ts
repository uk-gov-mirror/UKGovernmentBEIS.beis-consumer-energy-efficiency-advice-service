import {UserState} from "./user-state";

export interface UserStateResponse {
    reference: string;
    state: UserState;
    updated: string;
}
