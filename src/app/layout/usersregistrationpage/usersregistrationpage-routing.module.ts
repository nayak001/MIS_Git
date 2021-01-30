import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersregistrationpageComponent } from './usersregistrationpage.component';

const routes: Routes = [
    { path: '', component: UsersregistrationpageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersregistrationpageRoutingModule {
}
