import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserswapComponent } from "./userswap.component";

const routes: Routes = [{ path: "", component: UserswapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserswapRoutingModule {}
