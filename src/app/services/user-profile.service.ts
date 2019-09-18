import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _url:string="http://localhost:4600";

  constructor(private http:HttpClient) { }
  createAuthorizationHeader(headers: Headers) {
    let header="Bearer "+localStorage.getItem('token');
    headers.append('Authorization',header);
  }

  loadUserProfileData(){
    let header="Bearer "+localStorage.getItem('token');
    return this.http.get(`${this._url}/user_profile_details`,{headers:new HttpHeaders().set('Authorization',header)})
}
  
}
