export namespace AuthActions {

    export class Signin {
        static readonly type = '[Auth] Signin';
        constructor(public username: string, public password: string) { }
    }

    export class Signout {
        static readonly type = '[Auth] Signout';
    }

}