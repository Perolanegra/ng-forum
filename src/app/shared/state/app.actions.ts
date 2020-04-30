export namespace AppActions {

    export class SetMediaScreen {
        static readonly type = '[App] Set Media Screen';
        constructor(public hasMobileMatches: boolean) { }
    }


}