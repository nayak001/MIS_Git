import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagersboxComponent } from './managersbox.component';

const routes: Routes = [
    { path: '', component: ManagersboxComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagersboxRoutingModule {
}
