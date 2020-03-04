import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityvisitComponent } from './communityvisit.component';

const routes: Routes = [
    { path: '', component: CommunityvisitComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommunityvisitRoutingModule {
}
