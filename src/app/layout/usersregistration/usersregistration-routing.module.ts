import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersregistrationComponent } from './usersregistration.component';

const routes: Routes = [
    { path: '', component: UsersregistrationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersregistrationRoutingModule {
}
