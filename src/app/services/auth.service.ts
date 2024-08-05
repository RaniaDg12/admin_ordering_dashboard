import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/auth/admin/signin'; 
  private signupUrl = 'http://localhost:3000/auth/admin/signup';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password }; // Constructing the JSON body

    console.log('Request sent');
    return this.http.post<any>(this.loginUrl, body).pipe(
      map(response => {
        // Store the token or any other response data if needed
        localStorage.setItem('token', response.token);
        console.log('Response:', response);
        return response;
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password }; // Constructing the JSON body

    console.log('Signup request sent');
    return this.http.post<any>(this.signupUrl, body).pipe(
      map(response => {
        // Store the token or any other response data if needed
        localStorage.setItem('token', response.token);
        console.log('Signup response:', response);
        return response;
      })
    );
  }
}
