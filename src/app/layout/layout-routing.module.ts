import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'centers', loadChildren: './centers/centers.module#CentersModule' },
      { path: 'message', loadChildren: './message/message.module#MessageModule' },
      { path: 'blockdistrict', loadChildren: './blockdistrict/blockdistrict.module#BlockdistrictModule' },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'centers-allocation', loadChildren: './centers-allocation/centers-allocation.module#CentersAllocationModule' },
      { path: 'baselinetest', loadChildren: './baselinetest/baselinetest.module#BaselinetestModule' },
      { path: 'issues', loadChildren: './issues/issues.module#IssuesModule' },
      { path: 'centerfeedback', loadChildren: './centerfeedback/centerfeedback.module#CenterfeedbackModule' },
      { path: 'paymentinfo', loadChildren: './paymentinfo/paymentinfo.module#PaymentinfoModule' },
      { path: 'assessmentmaster', loadChildren: './assessmentmaster/assessmentmaster.module#AssessmentmasterModule' },
      { path: 'assessmentinfo', loadChildren: './assessmentinfo/assessmentinfo.module#AssessmentinfoModule' },
      { path: 'communityvisit', loadChildren: './communityvisit/communityvisit.module#CommunityvisitModule' },
      { path: 'centerimage', loadChildren: './centerimage/centerimage.module#CenterimageModule' },
      { path: 'centerlocation', loadChildren: './centerlocation/centerlocation.module#CenterlocationModule' },
      { path: 'forms', loadChildren: './form/form.module#FormModule' },
      { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
      { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
      { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
      { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
      { path: 'pushnotification', loadChildren: './pushnotification/pushnotification.module#PushnotificationModule' },
      { path: 'activities', loadChildren: './activities/activities.module#ActivitiesModule' },
      { path: 'dailyinfo', loadChildren: './dailyinfo/dailyinfo.module#DailyinfoModule' },
      { path: 'studentdetails', loadChildren: './studentdetails/studentdetails.module#StudentdetailsModule' },
      { path: 'mgroperations', loadChildren: './mgroperations/mgroperations.module#MgroperationsModule' },
      { path: 'attendance', loadChildren: './attendance/attendance.module#AttendanceModule' },
      { path: 'tchactivity', loadChildren: './tchactivity/tchactivity.module#TchactivityModule' },
      { path: 'masterteachertraining1', loadChildren: './masterteachertraining1/masterteachertraining1.module#Masterteachertraining1Module' },
      { path: 'masterteachertraining2', loadChildren: './masterteachertraining2/masterteachertraining2.module#Masterteachertraining2Module' },
      { path: 'userfeedback', loadChildren: './userfeedback/userfeedback.module#UserfeedbackModule' },
      { path: 'usersession', loadChildren: './usersession/usersession.module#UsersessionModule' },
      { path: 'tchassessment', loadChildren: './tchassessment/tchassessment.module#TchassessmentModule' },
      { path: 'versionmanager', loadChildren: './versionmanager/versionmanager.module#VersionmanagerModule' },
      { path: 'tchbaseline', loadChildren: './tchbaseline/tchbaseline.module#TchbaselineModule' },
      { path: 'leapgeneralinfo', loadChildren: './leapgeneralinfo/leapgeneralinfo.module#LeapgeneralinfoModule' },
      { path: 'schoolgenifo', loadChildren: './schoolgeninfo/schoolgeninfo.module#SchoolgeninfoModule' },
      { path: 'leapgrouptask', loadChildren: './leapgrouptask/leapgrouptask.module#LeapgrouptaskModule' },
      { path: 'schoolgrouptask', loadChildren: './schoolgrouptask/schoolgrouptask.module#SchoolgrouptaskModule' },
      { path: 'leapindpractice', loadChildren: './leapindpractice/leapindpractice.module#LeapindpracticeModule' },
      { path: 'schoolindpractice', loadChildren: './schoolindpractice/schoolindpractice.module#SchoolindpracticeModule' },
      { path: 'tzworkshoplevel', loadChildren: './tzworkshoplevel/tzworkshoplevel.module#TzworkshoplevelModule' },
      { path: 'tzworkshopcontent', loadChildren: './tzworkshopcontent/tzworkshopcontent.module#TzworkshopcontentModule' },
      { path: 'managersbox', loadChildren: './managersbox/managersbox.module#ManagersboxModule' },
      { path: 'centerDetails', loadChildren: './centerDetails/centerDetails.module#CenterDetailsModule' },
      { path: 'studentDetailsPage', loadChildren: './studentDetailsPage/studentDetailsPage.module#StudentDetailsPageModule' },
      { path: 'usertype', loadChildren: './usertype/usertype.module#UsertypeModule' },
      { path: 'individualUserPage/:id', loadChildren: './individualUserPage/individualUserPage.module#IndividualUserPageModule' },
      { path: 'managerDetails', loadChildren: './managerDetails/managerDetails.module#ManagerDetailsModule' },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
