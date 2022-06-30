import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "users", pathMatch: "prefix" },
      {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
      },
      {
        path: "centers",
        loadChildren: "./centers/centers.module#CentersModule",
      },
      {
        path: "message",
        loadChildren: "./message/message.module#MessageModule",
      },
      {
        path: "blockdistrict",
        loadChildren:
          "./blockdistrict/blockdistrict.module#BlockdistrictModule",
      },
      { path: "users", loadChildren: "./users/users.module#UsersModule" },
      {
        path: "usersregistration",
        loadChildren:
          "./usersregistration/usersregistration.module#UsersregistrationModule",
      },
      {
        path: "usersregistrationpage",
        loadChildren:
          "./usersregistrationpage/usersregistrationpage.module#UsersregistrationpageModule",
      },
      {
        path: "teacherprofile",
        loadChildren:
          "./teacherprofile/teacherprofile.module#TeacherprofileModule",
      },
      {
        path: "centers-allocation",
        loadChildren:
          "./centers-allocation/centers-allocation.module#CentersAllocationModule",
      },
      {
        path: "allocatedcenters",
        loadChildren:
          "./allocatedcenters/allocatedcenters.module#AllocatedcentersModule",
      },
      {
        path: "baselinetest",
        loadChildren: "./baselinetest/baselinetest.module#BaselinetestModule",
      },
      { path: "issues", loadChildren: "./issues/issues.module#IssuesModule" },
      {
        path: "managersfeedbackform",
        loadChildren:
          "./managersfeedbackform/managersfeedbackform.module#ManagersfeedbackformModule",
      },
      {
        path: "centerfeedback",
        loadChildren:
          "./centerfeedback/centerfeedback.module#CenterfeedbackModule",
      },
      {
        path: "paymentinfo",
        loadChildren: "./paymentinfo/paymentinfo.module#PaymentinfoModule",
      },
      {
        path: "assessmentmaster",
        loadChildren:
          "./assessmentmaster/assessmentmaster.module#AssessmentmasterModule",
      },
      {
        path: "assessmentinfo",
        loadChildren:
          "./assessmentinfo/assessmentinfo.module#AssessmentinfoModule",
      },
      {
        path: "communityvisit",
        loadChildren:
          "./communityvisit/communityvisit.module#CommunityvisitModule",
      },
      {
        path: "centerimage",
        loadChildren: "./centerimage/centerimage.module#CenterimageModule",
      },
      {
        path: "centerlocation",
        loadChildren:
          "./centerlocation/centerlocation.module#CenterlocationModule",
      },
      { path: "forms", loadChildren: "./form/form.module#FormModule" },
      {
        path: "bs-element",
        loadChildren: "./bs-element/bs-element.module#BsElementModule",
      },
      { path: "grid", loadChildren: "./grid/grid.module#GridModule" },
      {
        path: "components",
        loadChildren: "./bs-component/bs-component.module#BsComponentModule",
      },
      {
        path: "blank-page",
        loadChildren: "./blank-page/blank-page.module#BlankPageModule",
      },
      {
        path: "pushnotification",
        loadChildren:
          "./pushnotification/pushnotification.module#PushnotificationModule",
      },
      {
        path: "sendSMS",
        loadChildren: "./sendSMS/sendSMS.module#SendSMSModule",
      },
      {
        path: "activities",
        loadChildren: "./activities/activities.module#ActivitiesModule",
      },
      {
        path: "postcallactivities",
        loadChildren:
          "./postcallactivities/postcallactivities.module#PostcallactivitiesModule",
      },
      {
        path: "eceactivities",
        loadChildren:
          "./eceactivities/eceactivities.module#EceactivitiesModule",
      },
      {
        path: "pgeactivities",
        loadChildren:
          "./pgeactivities/pgeactivities.module#PgeactivitiesModule",
      },
      {
        path: "dailyinfo",
        loadChildren: "./dailyinfo/dailyinfo.module#DailyinfoModule",
      },
      {
        path: "studentdetails",
        loadChildren:
          "./studentdetails/studentdetails.module#StudentdetailsModule",
      },
      {
        path: "mgroperations",
        loadChildren:
          "./mgroperations/mgroperations.module#MgroperationsModule",
      },
      {
        path: "attendance",
        loadChildren: "./attendance/attendance.module#AttendanceModule",
      },
      {
        path: "tchactivity",
        loadChildren: "./tchactivity/tchactivity.module#TchactivityModule",
      },
      {
        path: "masterteachertraining1",
        loadChildren:
          "./masterteachertraining1/masterteachertraining1.module#Masterteachertraining1Module",
      },
      {
        path: "masterteachertraining2",
        loadChildren:
          "./masterteachertraining2/masterteachertraining2.module#Masterteachertraining2Module",
      },
      {
        path: "offlinetraining",
        loadChildren:
          "./offlinetraining/offlinetraining.module#OfflinetrainingModule",
      },
      {
        path: "mastermanagertraining1",
        loadChildren:
          "./mastermanagertraining1/mastermanagertraining1.module#Mastermanagertraining1Module",
      },
      {
        path: "mastermanagertraining2",
        loadChildren:
          "./mastermanagertraining2/mastermanagertraining2.module#Mastermanagertraining2Module",
      },
      {
        path: "masterteacherassesment",
        loadChildren:
          "./masterteacherassesment/masterteacherassesment.module#MasterteacherassesmentModule",
      },
      {
        path: "userfeedback",
        loadChildren: "./userfeedback/userfeedback.module#UserfeedbackModule",
      },
      {
        path: "usersession",
        loadChildren: "./usersession/usersession.module#UsersessionModule",
      },
      {
        path: "tchassessment",
        loadChildren:
          "./tchassessment/tchassessment.module#TchassessmentModule",
      },
      {
        path: "versionmanager",
        loadChildren:
          "./versionmanager/versionmanager.module#VersionmanagerModule",
      },
      {
        path: "udisemanager",
        loadChildren: "./udisemanager/udisemanager.module#UdisemanagerModule",
      },
      {
        path: "dashboardslidermanager",
        loadChildren:
          "./dashboardslidermanager/dashboardslidermanager.module#DashboardslidermanagerModule",
      },
      {
        path: "tchbaseline",
        loadChildren: "./tchbaseline/tchbaseline.module#TchbaselineModule",
      },
      {
        path: "nsdc",
        loadChildren: "./nsdc/nsdc.module#NsdcModule",
      },
      {
        path: "updatensdcmark",
        loadChildren:
          "./updatensdcmark/updatensdcmark.module#UpdatensdcmarkModule",
      },
      {
        path: "nsdcexam",
        loadChildren: "./nsdcexam/nsdcexam.module#NsdcExamModule",
      },
      {
        path: "nsdccert",
        loadChildren: "./nsdccert/nsdccert.module#NsdccertModule",
      },
      {
        path: "flnmaster",
        loadChildren: "./flnmaster/flnmaster.module#FlnmasterModule",
      },
      {
        path: "nsdcmastermodule",
        loadChildren:
          "./masternsdcmodule/masternsdcmodule.module#MasterNsdcModule",
      },
      {
        path: "backtomaster",
        loadChildren: "./nsdcexam/nsdcexam.module#NsdcExamModule",
      },
      {
        path: "leapgeneralinfo",
        loadChildren:
          "./leapgeneralinfo/leapgeneralinfo.module#LeapgeneralinfoModule",
      },
      {
        path: "schoolgenifo",
        loadChildren:
          "./schoolgeninfo/schoolgeninfo.module#SchoolgeninfoModule",
      },
      {
        path: "leapgrouptask",
        loadChildren:
          "./leapgrouptask/leapgrouptask.module#LeapgrouptaskModule",
      },
      {
        path: "schoolgrouptask",
        loadChildren:
          "./schoolgrouptask/schoolgrouptask.module#SchoolgrouptaskModule",
      },
      {
        path: "leapindpractice",
        loadChildren:
          "./leapindpractice/leapindpractice.module#LeapindpracticeModule",
      },
      {
        path: "schoolindpractice",
        loadChildren:
          "./schoolindpractice/schoolindpractice.module#SchoolindpracticeModule",
      },
      {
        path: "tzworkshoplevel",
        loadChildren:
          "./tzworkshoplevel/tzworkshoplevel.module#TzworkshoplevelModule",
      },
      {
        path: "tzworkshopcontent",
        loadChildren:
          "./tzworkshopcontent/tzworkshopcontent.module#TzworkshopcontentModule",
      },
      {
        path: "managersbox",
        loadChildren: "./managersbox/managersbox.module#ManagersboxModule",
      },
      {
        path: "gallery",
        loadChildren: "./gallery/gallery.module#GalleryModule",
      },
      {
        path: "erasedata",
        loadChildren:
          "./adminerasedata/adminerasedata.module#AdminerasedataModule",
      },
      {
        path: "skillchartfileupload",
        loadChildren:
          "./skillchartfileupload/skillchartfileupload.module#SkillchartfileuploadModule",
      },
      {
        path: "centerDetails",
        loadChildren:
          "./centerDetails/centerDetails.module#CenterDetailsModule",
      },
      {
        path: "studentDetailsPage",
        loadChildren:
          "./studentDetailsPage/studentDetailsPage.module#StudentDetailsPageModule",
      },
      {
        path: "usertype",
        loadChildren: "./usertype/usertype.module#UsertypeModule",
      },
      {
        path: "individualUserPage/:id",
        loadChildren:
          "./individualUserPage/individualUserPage.module#IndividualUserPageModule",
      },
      {
        path: "managerDetails",
        loadChildren:
          "./managerDetails/managerDetails.module#ManagerDetailsModule",
      },
      {
        path: "learningOutcomes",
        loadChildren:
          "./learningOutcomes/learningOutcomes.module#LearningOutcomesModule",
      },
      {
        path: "individualTeachersEducatorPage",
        loadChildren:
          "./individualTeachersEducatorPage/individualTeachersEducatorPage.module#IndividualTeachersEducatorPageModule",
      },
      {
        path: "teacherperformancereport",
        loadChildren:
          "./teacherperformancereport/teacherperformancereport.module#TeacherperformancereportModule",
      },
      {
        path: "manager_todo",
        loadChildren: "./manager_todo/manager_todo.module#Manager_todoModule",
      },
      {
        path: "passcodemanager",
        loadChildren:
          "./passcodemanager/passcodemanager.module#PasscodemanagerModule",
      },
      {
        path: "trainingmisc",
        loadChildren: "./trainingmisc/trainingmisc.module#TrainingMiscModule",
      },
      {
        path: "hblmaster",
        loadChildren: "./hblmaster/hblmaster.module#HblmasterModule",
      },
      //{ path: 'hblmaster', loadChildren: './hbl_master/hbl_master.module#hblmasterRoutingModule' },
      {
        path: "homebasemaster",
        loadChildren:
          "./homebasemaster/homebasemaster.module#HomebasemasterModule",
      },
      {
        path: "hblactivityreport",
        loadChildren:
          "./hblactivityreport/hblactivityreport.module#HblactivityreportModule",
      },
      {
        path: "pptreport",
        loadChildren: "./pptreport/pptreport.module#PptreportModule",
      },
      {
        path: "surveymaster",
        loadChildren: "./surveymaster/surveymaster.module#SurveymasterModule",
      },
      {
        path: "surveyreport",
        loadChildren: "./surveyReport/surveyReport.module#SurveyReportModule",
      },
      {
        path: "ppt",
        loadChildren:
          "./preprogramteachertraining/preprogramteachertraining.module#PreprgrameTeacherTrainingModule",
      },
      {
        path: "teacherbaseline",
        loadChildren:
          "./teacherbaseline/teacherbaseline.module#TeacherBaselineModule",
      },
      {
        path: "preprogramtrainingmodule",
        loadChildren:
          "./preprogramtrainingmodules/preprogramtrainingmodules.module#PreprogramtrainingModule",
      },
      {
        path: "pgskillmaster",
        loadChildren:
          "./pgeskillmaster/pgeskillmaster.module#pgskillmasterModule",
      },
      {
        path: "userswap",
        loadChildren: "./userswap/userswap.module#UserswapModule",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
