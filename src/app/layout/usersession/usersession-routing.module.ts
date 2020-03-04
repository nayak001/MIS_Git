import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersessionComponent } from './usersession.component';

const routes: Routes = [
    { path: '', component: UsersessionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersessionRoutingModule {
}
