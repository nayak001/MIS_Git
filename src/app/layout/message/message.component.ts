import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ValidationService } from  './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    animations: [routerTransition()]
})
export class MessageComponent implements OnInit {
  // res
  public data: any;
	all_messages: any = [];
  all_users: any = [];
  user_list: any = [];
  selected_user_list: any = [];

  // form
  messageModalFormGroup: FormGroup;
  txt_title: string='';
  txt_message: string='';
  isChecked: boolean=false;
  isDisabled: boolean=false;

	// modal
	closeResult: string;
	modalReference: any;

	// loading gif
	hideLoading_indicator: boolean;

  centersubmitaction: string;
	modal_id: string;
	modal_centerid: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public router: Router,
    private messageService: MessageService
	) {
		this.messageModalFormGroup = this.formBuilder.group({
      txt_title: ['', [Validators.required]],
			txt_message: ['', [Validators.required]]
		});
		this.hideLoading_indicator = true;
	}

	ngOnInit() {
		this.hideLoading_indicator = false;

		// get all messages
		this.messageService.getallmessages().subscribe(data => {
        this.data = data;
        this.all_messages = data;
        this.hideLoading_indicator = true;
      },
      error => {},
      () => {}
    );

		// get all user
    this.messageService.getalluser().subscribe(data => {
        this.all_users = data;
        this.hideLoading_indicator = true;

        Object.keys(data).forEach(i => {
          let element = data[i];
          let obj = { id: element['_id'], itemName: element['userid'] };
          this.user_list.push(obj);
        });
      },
      error => {},
      () => {}
    );
  }

  set_userList(data){
    data.forEach(element => {
      let obj = { id: element['_id'], itemName: element['userid'] };
      this.user_list.push(obj);
    });
  }

  user_on_select(event, user){
    if(event.currentTarget.checked) {
      let i = -1;
      this.selected_user_list.forEach(element => {
        if(user._id == element._id)
          i++;
      });
      if(i < 0)
        this.selected_user_list.push(user);
    }else {
      let i = 0;
      let index = 0;
      this.selected_user_list.forEach(element => {
        if(user._id == element._id){
          index = i;
          return;
        }
        i++;
      });
      if(i >= 0)
        this.selected_user_list.splice(index,1);
    }
  }
  alluser_on_select(event){
    if(event.currentTarget.checked){
      this.selected_user_list = [];
      this.selected_user_list = this.all_users;
      this.isChecked = true;
      this.isDisabled = true;
    }else{
      this.selected_user_list = [];
      this.isChecked = false;
      this.isDisabled = false;
    }
  }

	open(content, center) {
		this.modalReference = this.modalService.open(content, center);
    this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }

	formSubmitAction() {
    let id = ''+ (new Date().getTime());
    let userid_list = this.selected_user_list;
    let title = this.txt_title;
    let message = this.txt_message;
    let status = 'unread';

    let obj = {
      id: id,
      userid_list: userid_list,
      title: title,
      message: message,
      status: status
    };

    this.messageService.createnewmessage(obj).subscribe(data => {
        this.modalReference.close();
        location.reload();
      },
      error => { },
      () => {}
    );
	}

	deleteFormSubmitAction(id) {
		this.messageService.deletemessagebyid(id).subscribe(data => {
				this.modalReference.close();
				location.reload();
			},
			error => { },
			() => {}
		);
	}
}
