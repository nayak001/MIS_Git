import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PushnotificationComponent } from './pushnotification.component';

const routes: Routes = [
    { path: '', component: PushnotificationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PushnotificationRoutingModule {
}
