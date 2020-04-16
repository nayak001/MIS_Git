import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SkillchartfileuploadService {
	constructor(private http: HttpClient) { }

	// S3 BUCKET
	
	getfroms3(): Observable<any> {
		return this.http.get(baseUrl+'s3api/all');
	}
	
	savetos3(file: File, s3name): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', baseUrl+'s3api/upload/'+s3name, formdata, {
			reportProgress: true,
			//responseType: 'text'
		});
		return this.http.request(req);
	}
	
	deletefroms3(filename){
		return this.http.delete(baseUrl+'/s3api/delete/'+filename,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	// DATABASE
	geteceskillchartfileuploaddetails(){				
		return this.http.get(baseUrl+'geteceskillchartfileuploaddetails',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getpgemathskillchartfileuploaddetails(){				
		return this.http.get(baseUrl+'getpgemathskillchartfileuploaddetails',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getpgeengskillchartfileuploaddetails(){				
		return this.http.get(baseUrl+'getpgeengskillchartfileuploaddetails',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getpgeodiaskillchartfileuploaddetails(){				
		return this.http.get(baseUrl+'getpgeodiaskillchartfileuploaddetails',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	saveskillchartfileuploaddetails(body){
		return this.http.post(baseUrl+'saveskillchartfileuploaddetails',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	updateskillchartfileuploaddetails(id, body){
		return this.http.put(baseUrl+'updateskillchartfileuploaddetails/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deleteskillchartfileuploaddetails(id){
		return this.http.delete(baseUrl+'deleteskillchartfileuploaddetails/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}
