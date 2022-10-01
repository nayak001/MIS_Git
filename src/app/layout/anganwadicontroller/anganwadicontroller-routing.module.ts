import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnganwadicontrollerComponent } from './anganwadicontroller.component';

const routes: Routes = [
    { path: '', component: AnganwadicontrollerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnganwadicontrollerRoutingModule {
}
