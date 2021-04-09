import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ConfigsComponent } from "./configs.component";

const routes: Routes = [
  { path: "configs", redirectTo: "", pathMatch: "full" },
  {
    path: "", // rota/:param
    component: ConfigsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    // resolvers
  ],
})
export class ConfigsRoutingModule {}
