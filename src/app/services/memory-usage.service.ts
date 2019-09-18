import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { SyncRequestClient } from 'ts-sync-request/dist';
@Injectable({
    providedIn: 'root'
})
export class MemoryUsageService {
    private _url: string = "http://localhost:4600";
    constructor(private http: HttpClient) { }

    loadMemoryUsed(){
        let header="Bearer "+localStorage.getItem('token');
        return this.http.get(`${this._url}/memory_used`,{headers:new HttpHeaders().set('Authorization',header)});
    }
}
