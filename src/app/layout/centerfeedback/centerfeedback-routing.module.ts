import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterfeedbackComponent } from './centerfeedback.component';

const routes: Routes = [
    { path: '', component: CenterfeedbackComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CenterfeedbackRoutingModule {
}
