import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UpdatensdcmarkComponent } from "./updatensdcmark.component";

const routes: Routes = [{ path: "", component: UpdatensdcmarkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatensdcmarkRoutingModule {}
