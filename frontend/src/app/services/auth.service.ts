import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logoff(): Observable<unknown> {
    return this.http.get<unknown>(`http://localhost:3000/auth/logout`);
  }

  login(body: any): Observable<unknown>{
    return this.http.post<unknown>(`http://localhost:3000/auth/login`, body);
  }

  signup(body: any): Observable<unknown>{
    return this.http.post<unknown>(`http://localhost:3000/auth/signup`, body);
  }

}
