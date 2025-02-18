import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article, Comment} from '../../variables/Article';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyarticleService {

  constructor(private http: HttpClient) {
  }

  addNewArticle(article: Article, username: string): Observable<string> {
    return this.http.post<string>('http://localhost:7277/article/addarticle/' + username, article, {responseType: 'text' as 'json'});
  }

  getPrincipalArticle(username: string): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:7277/article/getprincipalarticle/' + username);
  }

  likes(articleId: string, username: string): Observable<string> {
    const url = `http://localhost:7277/article/like/${articleId}/${username}`;
    return this.http.post<string>(url, null, { responseType: 'text' as 'json' });
  }


  dislikes(articleId: string, username: string): Observable<string> {
    return this.http.post<string>('http://localhost:7277/article/dislike/' + articleId + '/' + username, null, {responseType: 'text' as 'json'});
  }

  addNewComment(articleId: string, username: string, comment: Comment): Observable<string> {
    const url = `http://localhost:7277/article/addcomment/${articleId}/${username}`;
    return this.http.post<string>(url, comment, { responseType: 'text' as 'json' });
  }


  deleteComment(id: number): Observable<string> {
    return this.http.delete<string>('http://localhost:7277/article/deletecomment/' + id, {responseType: 'text' as 'json'});
  }

  deleteArticle(id: string): Observable<string> {
    return this.http.delete<string>('http://localhost:7277/article/deletearticle/' + id, {responseType: 'text' as 'json'});
  }

  updateComment(y: Comment): Observable<string> {
    return this.http.put<string>('http://localhost:7277/article/updatecomment', y, {responseType: 'text' as 'json'});
  }

  updateArticle(y: Article): Observable<string> {
    return this.http.put<string>('http://localhost:7277/article/updatearticle', y, {responseType: 'text' as 'json'});
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:7277/article/getallarticle');
  }

  saveArticle(articleId: string, username: string): Observable<string> {
    return this.http.post<string>('http://localhost:7277/article/savearticle/' + articleId + '/' + username, null, {responseType: 'text' as 'json'});
  }

  getSavedArticles(username: string): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:7277/article/getprincipalsavedarticle/' + username);
  }

  deleteSavedArticle(articleId: string, username: string): Observable<string> {
    const url = `http://localhost:7277/article/deletesavedarticle/${articleId}/${username}`;
    return this.http.delete<string>(url, { responseType: 'text' as 'json' });
  }

}
