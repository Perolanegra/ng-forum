export namespace AppActions {

    export class SetMediaScreen {
        static readonly type = '[App] Set Media Screen';
        constructor(public hasMobileMatches: boolean) { }
    }

    export class SetSessionState {
        static readonly type = '[App] Set Session State';
        constructor(public statePath: string) { }
    }


}