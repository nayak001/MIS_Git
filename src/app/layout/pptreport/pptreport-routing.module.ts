import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PptreportComponent } from './pptreport.component';

const routes: Routes = [
    { path: '', component: PptreportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PptreportRoutingModule {
}
