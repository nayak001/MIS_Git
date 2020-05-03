import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { Manager_todoService } from  './manager_todo.service';
import swal from  'sweetalert2';

@Component({
    selector: 'app-users',
    templateUrl: './manager_todo.component.html',
    styleUrls: ['./manager_todo.component.scss'],
    animations: [routerTransition()]
})

export class Manager_todoComponent implements OnInit {
  keyword_managername: string= "username";
  selected_username: string= "";
  selected_managerobj: any;

  selected_userid: string= "";
  selected_month: string= "";
  selected_year: string= "";

  managers: any;
  taskdata: any= [];

	hideLoading_indicator: boolean;
    constructor(
        public router: Router,
		    private manager_todoService: Manager_todoService
	  ) {
    this.hideLoading_indicator = true;
    this.getallmanager();
	}

  ngOnInit() {}

  // user on change <-- auto complete
	onchange_manager(val: string) {
		console.log('--> manager auto-complete change event'+JSON.stringify(val));
	}
	onfocus_manager(e){
		console.log('--> manager auto-complete focus event'+JSON.stringify(e));
	}
	onselect_manager(item){
    //console.log('--> manager auto-complete select event'+JSON.stringify(item));
    this.selected_managerobj = item;
		this.selected_userid = (item.userid == undefined) ? '' : item.userid;
		this.selected_username = (item.username == undefined) ? '' : item.username;
    console.log('--> selected_username: '+this.selected_username);
    
    this.getcalanderdata();
  }
  
  // month on change
	month_on_change(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_month = selectedOptionValue;
    
    this.getcalanderdata();
  }

  // year on change
	year_on_change(event: Event) {
    const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_year = selectedOptionValue;
    
    this.getcalanderdata();
  }

	getallmanager(){
		this.hideLoading_indicator = false;
		this.manager_todoService.getallmanager().subscribe(data => {
				this.managers = data;
				this.hideLoading_indicator = true;				
			}, error => {}, () => {}
		);	
  }
  
  async getcalanderdata() {
    if(this.selected_userid == undefined || this.selected_userid == null || this.selected_userid == ''){
      //swal.fire('Info', 'Plese select an user', 'warning');
    }else if(this.selected_month == undefined || this.selected_month == null || this.selected_month == ''){
      //swal.fire('Info', 'Plese select month', 'warning');
    }else if(this.selected_year == undefined || this.selected_year == null || this.selected_year == ''){
      //swal.fire('Info', 'Plese select year', 'warning');
    }else{
      // date formatting
      let date = new Date();
      let current_date = date.getDate();

      let fromdate = new Date(parseInt(this.selected_year), parseInt(this.selected_month), 1);
      let todat = new Date(parseInt(this.selected_year), parseInt(this.selected_month)+1, 0);
      let todate = new Date(todat.setHours(23, 59, 59, 59));
      console.log('###Params: userid:'+this.selected_userid+', fromdate: '+fromdate+', todate: '+todate);

      this.hideLoading_indicator = false;
      await this.manager_todoService.getManagerTask(this.selected_userid, fromdate, todate).subscribe(res => {
            this.taskdata = res;
            console.log('###TaskData: '+JSON.stringify(this.taskdata));
            this.taskdata.sort((a, b) => {
              if( new Date(a.task_date) > new Date(b.task_date))
                return 1 ;
              if( new Date(a.task_date) < new Date(b.task_date))
                return -1 ;
              return 1;  
            });
            this.hideLoading_indicator = true;
          }, err => {
            console.log(err);
            this.hideLoading_indicator = true;
          });
      }
    }

    delete_task_button_click(task){
      let id = task._id;
      swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove this record?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
        }).then((result) => {
        if (result.value) {
          /*this.manager_todoService.deleteManagerTask(id).subscribe(data => {
              console.log('### res data: ' + JSON.stringify(data));
              this.getcalanderdata();
            },
            error => {console.log('###2 error: ' + JSON.stringify(error)); },
            () => {}
          );*/
        }
      });

    }
}
