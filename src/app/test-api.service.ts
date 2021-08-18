import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TestApiService {
  apiEndpoint = environment.devURI;
  constructor(private http: HttpClient) { }

  apiBikeCall(){
    return this.http.get(this.apiEndpoint + '/bikes');
  }

  apiBikeIdCall(id:number){
    return this.http.get(this.apiEndpoint + '/bike?storeId='+id);
  }

  apiMultBikeIdCall(ids:[number]){
    var strToAppend = ''
    for(let i = 0; i < ids.length; i++) {
      if( i === 0 ){
        strToAppend += '?storeId='+ ids[i];
      } else{
        strToAppend += '&storeId='+ ids[i];
      }
    }
    return this.http.get(this.apiEndpoint + '/bike'+strToAppend);
  }

  apiBikeNameCall(name:string){
    return this.http.get(this.apiEndpoint + '/bike?name='+name);
  }

  apiUpdateBikeParts(id:number, newParts: number[]) {
    return this.http.put(this.apiEndpoint + '/bike?storeId=' + id, {parts: newParts});
  }

  apiPartIdCall(id:number){
    return this.http.get(this.apiEndpoint + '/part?storeId='+id);
  }

  apiMultPartIdCall(ids:number[]){
    var strToAppend = ''
    for(let i = 0; i < ids.length; i++) {
      if( i === 0 ){
        strToAppend += '?storeId='+ ids[i];
      } else{
        strToAppend += '&storeId='+ ids[i];
      }
    }
    return this.http.get(this.apiEndpoint + '/part'+strToAppend);
  }

  apiPartCall(){
    return this.http.get(this.apiEndpoint + '/parts');
  }
}
