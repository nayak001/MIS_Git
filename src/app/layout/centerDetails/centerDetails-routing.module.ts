import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterDetailsComponent } from './centerDetails.component';

const routes: Routes = [
    { path: '', component: CenterDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
