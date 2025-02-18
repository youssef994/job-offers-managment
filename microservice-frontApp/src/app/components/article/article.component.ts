import {Component, OnInit} from '@angular/core';
import {MyarticleService} from '../myarticle/myarticle.service';
import {Article, Comment} from '../../variables/Article';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [MessageService]
})
export class ArticleComponent implements OnInit {

  allArticle: Article[] = [];
  desc: string;
  descdialog = false;
  showImgaeUrl = 'http://localhost:7277/article/getimage/';
  userName: string;
  comments: Comment[] = [];
  showCommentDg = false;

  updateOption = false;
  articId: string;
  addCommentDg = false;
  newComment: Comment = {};
  submitted = false;

  constructor(private articleService: MyarticleService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.getAllArticle();
  }

  showDesc(description: string) {
    this.desc = description;
    this.descdialog = true;
  }

  getAllArticle() {
    this.articleService.getAllArticles().subscribe({
      next: (data) => {
        this.allArticle = data.reverse();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  like(id: any) {
    this.articleService.likes(id, this.userName).subscribe({
      next: (data) => {
        console.log(data);
        if (data === 'ok') {
          this.getAllArticle();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'already liked',
            life: 3000
          });
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  dislike(id: any) {
    this.articleService.dislikes(id, this.userName).subscribe({
      next: (data) => {
        console.log(data);
        if (data === 'ok') {
          this.getAllArticle();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'already disliked',
            life: 3000
          });
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  showComent(comments: Comment[]) {
    this.comments = comments.reverse();
    this.showCommentDg = true;
  }

  deleteComment(id: number) {
    this.articleService.deleteComment(id).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.showCommentDg = false;
        this.getAllArticle();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  addComentDialog(id: string) {
    this.updateOption = false;
    this.articId = id;
    this.addCommentDg = true;
    this.newComment = {};
    this.submitted = false;
  }

  addComment() {
    this.submitted = true;
    if (this.newComment.text) {
      this.articleService.addNewComment(this.articId, this.userName, this.newComment).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.addCommentDg = false;
          this.getAllArticle();
        },
        error: () => {
          this.addCommentDg = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while Adding this comment',
            life: 3000
          });
        }
      });
    }
  }

  updateComment(y: Comment) {
    this.updateOption = true;
    this.newComment = y;
    this.addCommentDg = true;
    this.submitted = false;
  }

  updateC() {
    this.submitted = true;
    if (this.newComment.text) {
      this.articleService.updateComment(this.newComment).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.updateOption = false;
          this.addCommentDg = false;
          this.getAllArticle();
        }, error: (err) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Error', life: 3000});
          this.updateOption = false;
          this.addCommentDg = false;
        }
      });
    }
  }

  saveArticle(X: any) {
    this.articleService.saveArticle(X.id, this.userName).subscribe({
      next: (data) => {
        if (data === 'article saved') {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        } else {
          this.messageService.add({severity: 'error', summary: 'ERROR', detail: data, life: 3000});
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
