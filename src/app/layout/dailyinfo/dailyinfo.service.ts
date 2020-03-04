import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class DailyinfoService {
	constructor(private http: HttpClient) { }

	// router.get('/getallmanager', user_controller.getallmanager);

	// router.get('/getcenterimagebyid/:id', centerimage_controller.getcenterimagebyid);
	// router.get('/getcenterimagebyuserid/:userid', centerimage_controller.getcenterimagebyuserid);
	// router.post('/savecenterimage', centerimage_controller.savecenterimage);

	getallmanager(){				
		return this.http.get(baseUrl+'getallmanager',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	getcenterimagebyuserid(userid){				
		//return this.http.get(baseUrl+'getcenterimagebyuserid/'+userid,
		return this.http.get(baseUrl+'getdailyinfobyuserid/'+userid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'blob' 
		});			
	}
	
	downloadcenterimage(filename){		
		return this.http.get(baseUrl+'downloadcenterimage/'+filename,
		{
			responseType: 'blob'
			//headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	deletecenterimage(id){				
		return this.http.delete(baseUrl+'deletecenterimage/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
			responseType: 'text' 
		});			
	}	
}