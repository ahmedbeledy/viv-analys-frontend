import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const AUTH_API = environment.AUTH_API
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(  email: string,username:string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
       email,
       username,
      password
    }, httpOptions);
  }
  logout( ): Observable<any> {
    return this.http.post(AUTH_API + 'logout' , httpOptions);
  }
  refreshToken() {
    return this.http.post(AUTH_API + 'refresh',  httpOptions);
  }
}
