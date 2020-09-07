import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders ,HttpEvent,HttpRequest} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TrainingmiscService {
	constructor(private http: HttpClient) { }

	pushFileToStorage(file: File, s3name): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', baseUrl+'s3api/upload/'+s3name, formdata, {
			reportProgress: true,
			//responseType: 'text'
		});
		return this.http.request(req);
	}
	getallfiles(){				
		return this.http.get(baseUrl+'/getallfiles',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	getpasscode(passcode){				
		return this.http.get(baseUrl+'checkpasscode/'+passcode,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	savefiles(body){
		return this.http.post(baseUrl+'savefiles',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	updatefile(id,body){
		return this.http.put(baseUrl+'updatefiles/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	deletefiles(id){
		return this.http.delete(baseUrl+'deletetfile/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	
}