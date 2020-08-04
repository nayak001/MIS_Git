import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasscodemanagerComponent } from './passcodemanager.component';

const routes: Routes = [
    { path: '', component: PasscodemanagerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PasscodemanagerRoutingModule {
}