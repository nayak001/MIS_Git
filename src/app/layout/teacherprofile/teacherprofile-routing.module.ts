import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherprofileComponent } from './teacherprofile.component';

const routes: Routes = [
    { path: '', component: TeacherprofileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeacherprofileRoutingModule {
}
