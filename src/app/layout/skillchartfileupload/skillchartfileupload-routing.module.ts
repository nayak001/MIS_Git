import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillchartfileuploadComponent } from './skillchartfileupload.component';

const routes: Routes = [
    { path: '', component: SkillchartfileuploadComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SkillchartfileuploadRoutingModule {
}
