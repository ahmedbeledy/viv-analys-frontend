import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:5000/api/';
let token = ""
let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient, private tokens: TokenStorageService) {
    token = this.tokens.getToken() || ""
    // httpOptions["headers"]= new HttpHeaders({ 'Content-Type': 'application/json',"Authorization":token })


  }

  getAllComments(): Observable<any> {
    return this.http.get(AUTH_API + 'comments',  httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
}
