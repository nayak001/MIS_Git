import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NsdcExamComponent } from "./nsdcexam.component";

const routes: Routes = [{ path: "", component: NsdcExamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class nsdcexamRoutingModule {}
