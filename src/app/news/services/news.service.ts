import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private _http: HttpClient) { }

  getNews(): Observable<any> {
    return this._http.get("https://newsapi.org/v2/everything?domains=wsj.com&apiKey=fa031ee1d42a4318b34b2819a13ade4a")
  }
}
