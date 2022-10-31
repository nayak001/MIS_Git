import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TeacherprofilecreateComponent } from "./teacherprofilecreate/teacherprofilecreate.component";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";

// import { SupervisorcontrollerComponent } from './supervisorcontroller/supervisorcontroller.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    NgbDropdownModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    TeacherprofilecreateComponent,
<<<<<<< HEAD
   
    // SupervisorcontrollerComponent,
=======
  
>>>>>>> f26601221c1c3e22756754c3573abe82edc8d700
  ],
  entryComponents: [TeacherprofilecreateComponent],
})
export class LayoutModule {}
