import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/login/login.component";
import { NoAuthGuard } from "./shared/guards/no-auth.guard";
import { LoginAuthGuard } from "./shared/guards/login-auth.guard";
import { ResetPasswordGuard } from "./shared/guards/reset-pass.guard";
import { ListIssueComponent } from "./modules/issues/list-issue/list-issue.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent, canActivate: [LoginAuthGuard] },

  {
    path: "home",
    loadChildren: () =>
      import("./modules/home/home.module").then((m) => m.HomeModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./modules/profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: "reset-password",
    loadChildren: () =>
      import("./modules/reset-password/reset-password.module").then(
        (m) => m.ResetPasswordModule
      ),
    canActivate: [ResetPasswordGuard],
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./modules/sign-up/sign-up.module").then((m) => m.SignUpModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: "issues",
    loadChildren: () =>
      import("./modules/issues/issues.module").then((m) => m.IssuesModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: "configs",
    loadChildren: () =>
      import("./modules/configs/configs.module").then((m) => m.ConfigsModule),
    canActivate: [NoAuthGuard],
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  useHash: true,
  onSameUrlNavigation: "reload",
});
