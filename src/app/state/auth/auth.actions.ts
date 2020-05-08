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

    export class ResetPass {
        static readonly type = '[Auth] ResetPass';
        constructor(public payload: { access_token: string, password: string }) { }
    }

    export class SetResetToken {
        static readonly type = '[Auth] Set Reset Token';
        constructor(public payload: string) { }
    }

    export class SetNotAuth {
        static readonly type = '[Auth] Set Not Auth ';
        constructor(public payload: string) { }
    }

    export class SetResetedPassword {
        static readonly type = '[Auth] Set Reseted Password ';
        constructor(public payload: boolean) { }
    }
    

}