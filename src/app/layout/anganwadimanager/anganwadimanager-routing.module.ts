import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnganwadimanagerComponent } from './anganwadimanager.component';

const routes: Routes = [
    { path: '', component: AnganwadimanagerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnganwadimanagerRoutingModule {
}
