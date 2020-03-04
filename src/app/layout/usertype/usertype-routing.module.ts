import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsertypeComponent } from './usertype.component';

const routes: Routes = [
    { path: '', component: UsertypeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsertypeRoutingModule {
}
