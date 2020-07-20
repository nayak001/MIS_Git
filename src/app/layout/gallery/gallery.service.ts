import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
	constructor(private http: HttpClient) { }
	// ============================================= S3 ===================================================
	// GET S3 DIRECTORY LIST
	gets3directorieslist(): Observable<any> {
		return this.http.get(baseUrl+'s3api/listdirectories');
	}
	
	// GET LIST OF FILES - FROM S3 BUCKET
	getFiles(): Observable<any> {
		return this.http.get(baseUrl+'s3api/all');
	}

	//CREATE S3 DIRECTORY
	creates3directory(directoryname): Observable<HttpEvent<{}>> {
		const req = new HttpRequest('POST', baseUrl+'s3api/createdirectory/'+directoryname, {
			//responseType: 'text'
		});
		return this.http.request(req);
	}

	// UPLOAD FILES - TO S3 BUCKET
	pushFileToStorage(file: File, directory, s3name): Observable<HttpEvent<{}>> {
		let uploadurl = '';
		uploadurl = (directory == undefined || directory == null || directory == '') ? 's3api/uploadroot/'+s3name : 's3api/uploaddir/'+directory+'/'+s3name;
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', baseUrl+uploadurl, formdata, {
			reportProgress: true,
			//responseType: 'text'
		});
		return this.http.request(req);
	}

	// DELETE FILE FROM S3 BUCKET 
	deleteFromStorage(filedirectory, filename){
		let s3url = '';
		s3url = (filedirectory == undefined || filedirectory == null || filedirectory == '') ? '/s3api/deletefromroot/'+filename : '/s3api/deletefromdirectory/'+filedirectory+'/'+filename;
		return this.http.delete(baseUrl+s3url,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	// DELETE FOLDER FROM S3 BUCKET 
	deleteDirectoryFromStorage(s3foldername){
		var delete_empty_folder = '/s3api/deletedirectory/';
		var delete_folder_with_contents = '/s3api/deleteallfromdirectory/';
		return this.http.get(baseUrl+delete_folder_with_contents+s3foldername,   // change http. get to http.delete accordingly
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	// ========================================- Managers Box ============================================
	// GET DIRECTORY LIST BY APPTYPE
	getdistinctdirectorylistbyapptype(apptype){				
		return this.http.get(baseUrl+'getdistinctdirectorylistbyapptype/'+apptype,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	finddirectorybyname(apptype, directoryname){				
		return this.http.get(baseUrl+'finddirectorybyname/'+apptype+'/'+directoryname,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	// GET ALL FILE LIST FROM MANAGERS BOX
	getallfilelistbyapptype(apptype){				
		return this.http.get(baseUrl+'getallfilelistbyapptype/'+apptype,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	// GET ALL FILE LIST INSIDE A DIRECTORY FROM MANAGERS BOX
	getallfilelistinsidedirectorybyapptype(apptype, directoryname){				
		return this.http.get(baseUrl+'getallfilelistinsidedirectorybyapptype/'+apptype+'/'+directoryname,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
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

	// DELETE FOLDER - FROM DATABASE
	deleteDirectoryFromManagersBox(filedirectory){
		return this.http.delete(baseUrl+'deleteDirectoryFromManagersBox/'+filedirectory,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
}
