import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostcallactivitiesComponent } from './postcallactivities.component';

const routes: Routes = [
    { path: '', component: PostcallactivitiesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostcallactivitiesRoutingModule {
}
