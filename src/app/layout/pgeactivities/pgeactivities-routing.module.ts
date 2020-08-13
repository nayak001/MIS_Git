import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PgeactivitiesComponent } from './pgeactivities.component';

const routes: Routes = [
    { path: '', component: PgeactivitiesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PgeactivitiesRoutingModule {
}
