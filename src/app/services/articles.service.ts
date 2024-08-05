import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateArticle, Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  addArticle(article: CreateArticle): Observable<CreateArticle> {
    return this.http.post<CreateArticle>(this.apiUrl, article);
  }

  updateArticle(id: string, article: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/update/${id}`, article);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

