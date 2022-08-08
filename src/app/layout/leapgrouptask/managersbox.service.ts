import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ManagersboxService {
	constructor(private http: HttpClient) { }

	// UPLOAD FILES - TO S3 BUCKET
	pushFileToStorage(file: File, s3name): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', baseUrl+'s3api/upload/'+s3name, formdata, {
			reportProgress: true,
			//responseType: 'text'
		});
		return this.http.request(req);
	}

	// GET LIST OF FILES - FROM S3 BUCKET
	getFiles(): Observable<any> {
		return this.http.get(baseUrl+'s3api/all');
	}

	// DELETE FILE FROM S3 BUCKET 
	deleteFromStorage(filename){
		return this.http.delete(baseUrl+'/s3api/delete/'+filename,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	// GET ALL FILE LIST - FROM DATABASE
	getAllFromManagersBox(){				
		return this.http.get(baseUrl+'getAllFromManagersBox',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	// SAVE UPLOAD DETAILS - TO DATABASE
	uploadToManagersBox(body){
		return this.http.post(baseUrl+'uploadToManagersBox',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}

	// DELETE FILES - FROM DATABASE
	deleteFromManagersBox(id){
		return this.http.delete(baseUrl+'deleteFromManagersBox/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
}
