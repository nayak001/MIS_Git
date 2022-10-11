import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { stringify } from 'querystring';

@Component({
  selector: 'app-supervisorcontroller',
  templateUrl: './supervisorcontroller.component.html',
  styleUrls: ['./supervisorcontroller.component.scss']
})
export class SupervisorcontrollerComponent implements OnInit {
  flag: string = "";
  txt_supervisorcode: string = "";
  txt_anganwadicode: string = "";
  txt_isselected:string="";
  txt_anganwadiname: string = "";
  modalReference: any;
  closeResult: string;
  _anganwadilist:  anganwadilist [] = [];
  _supervisorselect: supervisorselect;
  _anganwadiselectlist:supervisorselect[]=[];
  uniquekey:number=0;
  
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getcourses();
    this._supervisorselect = new supervisorselect();
  }


  record_onselect(item) {
    //this.reset();
    console.log("clicked")
     this.txt_supervisorcode=item.passcode;
     console.log("clicked2",this.txt_supervisorcode)
     this.txt_anganwadiname=item.anganwadiname;

     this.txt_anganwadicode = item.anganwadicode;
     console.log("clicked3",this.txt_anganwadicode)
     let selectedanganwadiidlist = item.anganwadiiid.split(",")
     console.log("split-->",selectedanganwadiidlist)
    for(let i = 0;i<selectedanganwadiidlist.length;i++){
     let list =  this._anganwadilist.filter(x=>x.id == Number(selectedanganwadiidlist[i])).map(x=>x.isselected=true)
     console.log("angselected-->",list)
    }
     console.log("clicked4",this.txt_isselected)
  }

  reset() {
    // this.txt_supervisorcode= "";
    // console.log("reset-->",this.txt_supervisorcode)
  
  }

 


// -------------------------------------CheckBox --------------------------

getcourses(){
  this._anganwadilist=[
  {id:1, name:"Anganwadi 1",isselected:false},
  {id:2, name:"Anganwadi 2",isselected:false},
  {id:3, name:"Anganwadi 3",isselected:false},
  {id:4, name:"Anganwadi 4",isselected:false},
  {id:5, name:"Anganwadi 5",isselected:false},
  {id:6, name:"Anganwadi 6",isselected:false},
  ]
}

onchange(){
  console.log(this._anganwadilist)
}

onsubmit(){
  this._supervisorselect.anganwadiiid = this._anganwadilist.filter(x=>x.isselected==true).map(x=>x.id).join(",").toString();
  console.log("anganwadi id-->",this._supervisorselect.anganwadiiid)
  this._supervisorselect.anganwadiname = this._anganwadilist.filter(x=>x.isselected==true).map(x=>x.name).join(",").toString();
  console.log("anganwadi name-->",this._supervisorselect.anganwadiname)
  this.uniquekey = this.uniquekey+1;
  console.log("unique key-->",this.uniquekey)
  this._supervisorselect.id = this.uniquekey;
  console.log("_anganwadiselect id 2-->",this._supervisorselect.id)
  this._anganwadiselectlist.push(this._supervisorselect);
  console.log("_anganwadiselectlist-->",this._anganwadiselectlist)
  this._supervisorselect = new supervisorselect();
  this.getcourses();
}















  // ----------------------------- Modal -------------------------------
  open(content, flag) {
    this.reset();
    this.flag = flag;

    if (flag == "save") {
      this.txt_supervisorcode = "";
   
    } 

    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}

class supervisorselect {
  id: number;
  name: string;
  anganwadiiid: string;
  anganwadiname: string;

}

class anganwadilist {
  id:number;
  name:string;
  isselected: boolean;
}



