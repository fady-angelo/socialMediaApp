import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toArray } from 'rxjs';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  newsArr: any[] = [];
  mainNews: any;

  constructor(private _news: NewsService) { }

  ngOnInit(): void {
    this.getAllNews();
  }


  getAllNews() {
    this._news.getNews().subscribe({
      next: (res: any) => {
        this.newsArr = res.articles;
        console.log(this.newsArr);
      }
    })
  }

  getItem(e: any) {
    const img: any = document.getElementById('img');
    const title: any = document.getElementById('title');
    const description: any = document.getElementById('description');
    const content: any = document.getElementById('content');
    const time: any = document.getElementById('time');
    const author: any = document.getElementById('author');
    const link: any = document.getElementById('link');
    this.mainNews = e
    img.src = this.mainNews.urlToImage
    title.innerHTML = this.mainNews.title
    description.innerHTML = this.mainNews.description
    content.innerHTML = this.mainNews.content
    time.innerHTML = this.mainNews.publishedAt
    author.innerHTML = this.mainNews.author
    link.href = this.mainNews.url
  }

}
