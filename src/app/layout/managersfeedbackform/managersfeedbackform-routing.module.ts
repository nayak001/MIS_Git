import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagersfeedbackformComponent } from './managersfeedbackform.component';

const routes: Routes = [
    { path: '', component: ManagersfeedbackformComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagersfeedbackformRoutingModule {
}
