export namespace AuthActions {

    export class Signin {
        static readonly type = '[Auth] Signin';
        constructor(public username: string, public password: string) { }
    }

    export class RemoveAccess {
        static readonly type = '[Auth] Signout';
    }

    export class ForgotPassword {
        static readonly type = '[Auth] ForgotPassword';
        constructor(public payload: string) { }
    }


}