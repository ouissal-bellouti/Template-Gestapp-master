import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Client } from '../pages/client';
import { FormGroup } from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:58314/Client'},
  )
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl ='http://localhost:58314/Client';
  choixmenu = 'A';
  listData: Client[];
  public clientForm : FormGroup;

  constructor(private http: HttpClient) { }


  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
   }

  GetAsync(Id: string): Observable<Client>{
    return this.http.get<Client>(`${this.apiUrl}/${Id}`)
  }
  postData(model: Client) : Observable<Client>{
    return this.http.post<Client>(this.apiUrl + 'Add', model, this.headers).pipe();
  }
  putData(Id: string, value:any):  Observable<Client>{
    return this.http.put<Client>(`${this.apiUrl}/${Id}`,value);
  }
  deleteData(Id: string): Observable<Client>{
    return this.http.delete<Client>(`${this.apiUrl}/${Id}`);
  }
 getAll():Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}`);
  }

}
