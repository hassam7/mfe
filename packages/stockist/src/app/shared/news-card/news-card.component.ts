import { Component, OnInit } from '@angular/core';
import { NewsService, Article } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: 'news-card.component.html',
  styleUrls: ['news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  public isLoading = true;
  public newsArticles: Article[];
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews().subscribe(articles => {
      this.newsArticles = articles;
      this.isLoading = false;
    });
  }
}
