import {Component, OnInit} from '@angular/core';
import {Article, Comment} from '../../variables/Article';
import {MyarticleService} from '../myarticle/myarticle.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-savedarticle',
  templateUrl: './savedarticle.component.html',
  styleUrls: ['./savedarticle.component.css'],
  providers: [MessageService]
})
export class SavedarticleComponent implements OnInit {

  savedArticles: Article[] = [];
  userName: string;
  desc: string;
  descdialog = false;
  showImgaeUrl = 'http://localhost:7277/article/getimage/';
  comments: Comment[] = [];
  showCommentDg = false;

  constructor(private articleService: MyarticleService, private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName');
    this.getSavedArticles();
  }


  getSavedArticles() {
    this.articleService.getSavedArticles(this.userName).subscribe({
      next: (data) => {
        this.savedArticles = data.reverse();
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  showDesc(description: string) {
    this.desc = description;
    this.descdialog = true;
  }

  showComent(comments: Comment[]) {
    this.comments = comments.reverse();
    this.showCommentDg = true;
  }

  deleteSavedArticle(id: string) {
    this.articleService.deleteSavedArticle(id, this.userName).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.getSavedArticles();
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
