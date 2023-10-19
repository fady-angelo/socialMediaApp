import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: number) {
    this.newItemEvent.emit(this.newsArr[value]);
    console.log(this.newsArr[value]);

  }


  newsArr: any[] = [];
  date: any = new Date();
  month: number = this.date.getMonth() + 1;
  year: number = this.date.getFullYear()
  day: number = this.date.getDate();
  fulldate: any = `${this.day}, ${this.month}, ${this.year}`

  constructor(private _news: NewsService) { }

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    this._news.getNews().subscribe({
      next: (res: any) => {
        this.newsArr = res.articles;
      }
    })
  }
}
