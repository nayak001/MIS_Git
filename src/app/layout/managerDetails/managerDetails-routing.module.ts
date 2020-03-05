import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDetailsComponent } from './managerDetails.component';

const routes: Routes = [
    { path: '', component:ManagerDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerDetailsRoutingModule {
}
