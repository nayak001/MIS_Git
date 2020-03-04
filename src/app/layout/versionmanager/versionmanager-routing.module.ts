import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VersionmanagerComponent } from './versionmanager.component';

const routes: Routes = [
    { path: '', component: VersionmanagerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VersionmanagerRoutingModule {
}
