import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SyncRequestClient } from 'ts-sync-request/dist';
@Injectable({
    providedIn: 'root'
})
export class FishDetailsService {
    private _url: string = "http://localhost:4600";
    constructor(private http: HttpClient) { }
    createAuthorizationHeader(headers: Headers) {
        let header="Bearer "+localStorage.getItem('token');
        headers.append('Authorization',header);
      }

    getItemData() {
        let header="Bearer "+localStorage.getItem('token');
        let url = "http://localhost:4600/fetch_details";
        var response = new SyncRequestClient().addHeader("Authorization",header).get<Response>(url);
        return response;
    }

    deleteItemData(id:string) {
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/delete_data/${id}`,{headers:new HttpHeaders().set('Authorization',header)});
    }

    filterData(id:string){
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/search_data/${id}`,{headers:new HttpHeaders().set('Authorization',header)});
    }

    changeVisibilityFalse(field:string){
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/visibility_change_false/${field}`,{headers:new HttpHeaders().set('Authorization',header)})
    }

    changeVisibilityTrue(field:string){
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/visibility_change_true/${field}`,{headers:new HttpHeaders().set('Authorization',header)})
    }

    loadVisibility(){
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/load_visibility`,{headers:new HttpHeaders().set('Authorization',header)})
    }

    
    getUpdateData(code:string) {
        let header="Bearer "+localStorage.getItem('token');
        let url = `http://localhost:4600/to_update_data/${code}`;
        var response = new SyncRequestClient().addHeader("Authorization",header).get<Response>(url);
        return response;
    }

    mark_availability_sold(code:string){
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/mark_availability_sold/${code}`,{headers:new HttpHeaders().set('Authorization',header)})
    }

    loadFishCount(){
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/load_fish_count`,{headers:new HttpHeaders().set('Authorization',header)})
    }

    getLocalKoiFishCount(){
        let header="Bearer "+localStorage.getItem('token');
        let url=this._url+'/get_localkoi_count';
        var response = new SyncRequestClient().addHeader("Authorization",header).get<Response>(url);
        // return this.http.get(`${this._url}/get_localkoi_count`);
        return response;
    }

    getImportedKoiFishCount(){
        let header="Bearer "+localStorage.getItem('token');
        let url=this._url+'/get_importedkoi_count';
        var response = new SyncRequestClient().addHeader("Authorization", header).get<Response>(url);
        // return this.http.get(`${this._url}/get_localkoi_count`);
        return response;
        // return this.http.get(`${this._url}/get_localkoi_count`);
    }

    getDeletedData() {
        let header="Bearer "+localStorage.getItem('token');
        let url = "http://localhost:4600/fetch_deleted_details";
        var response = new SyncRequestClient().addHeader("Authorization", header).get<Response>(url);
        return response;
    }
}
