import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/admin/`);
  }

  getUsers(): Observable<unknown>{
    return this.http.get<unknown>('')
  }

}


