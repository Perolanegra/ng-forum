export namespace AppActions {

    export class SetMediaScreen {
        static readonly type = '[App] Set Media Screen';
        constructor(public hasMobileMatches: boolean) { }
    }

    export class SetRouteState {
        static readonly type = '[App] Set Route State';
        constructor(public payload: any) { }
    }

    export class RemoveRouteState {
        static readonly type = '[App] Remove Route State';
    }

    export class SetPagination {
        constructor(public pagination: number | string) { }
        static readonly type = '[App] Set Pagination State';
    }


}