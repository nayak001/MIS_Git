import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
 import {DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    data:any;


    constructor(
        private dashboardService : DashboardService,
    ) {
       
        
        this.sliders.push(
            {
                imagePath: 'assets/images/banner1.jpg',
                label: 'ThinkZone Vision',
                text:'The work we do at ThinkZone is unique because we are developing a tech-based pedagogy for first generation learners and empowering women entrepreneurs who come from a limited education backgrounds with facilitation skills to provide tech-driven quality education in rural India,” said Binayak Acharya, Founder, ThinkZone.'
            },
            {
                imagePath: 'assets/images/banner2.jpg',
                label: 'Our Moto',
                text: 'Orientation workshop for our new batch of field associates.ThinkZone"s field associates all happen to be young #women who are ever so passionate to be a part of our journey of creating a positive change in the final mile #education delivery at the Bottom of the Pyramid.'
            },
            {
                imagePath: 'assets/images/banner3.jpg',
                label: 'Nobel Service',
                text:'The prospect of ThinkZone empowering women entrepreneurs as teachers to impart quality education using innovative low cost and scalable technology which can potentially benefit nearly 2 million students in the next five years is outlined as the rationale behind Gray Matters Capital'
			});
        
    }

    async ngOnInit() {
       await this.getallStudents()
	}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

   getallStudents(){
        this.dashboardService.getallstudents().subscribe(data => {
       
            this.data = data
        })
    }

 


}
