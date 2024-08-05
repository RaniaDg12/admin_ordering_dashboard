import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateSite, Site } from '../interfaces/site';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private apiUrl = 'http://localhost:3000/sites';

  constructor(private http: HttpClient) { }

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl);
  }
  
  addSite(site: CreateSite): Observable<CreateSite> {
    return this.http.post<CreateSite>(this.apiUrl, site);
  }

  updateSite(id: string, site: Partial<Site>): Observable<Site> {
    return this.http.put<Site>(`${this.apiUrl}/update/${id}`, site);
  }

  deleteSite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


}
