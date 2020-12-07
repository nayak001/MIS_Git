import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HblactivityreportComponent } from './hblactivityreport.component';

const routes: Routes = [
    { path: '', component: HblactivityreportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HblactivityreportRoutingModule {
}
