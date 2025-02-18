import {Component, OnInit} from '@angular/core';
import {Article, Comment} from '../../variables/Article';
import {MyarticleService} from './myarticle.service';
import {MenuItem, MessageService} from 'primeng/api';
import {ulid} from 'ulid';

@Component({
  selector: 'app-myarticle',
  templateUrl: './myarticle.component.html',
  styleUrls: ['./myarticle.component.css'],
  providers: [MessageService]
})
export class MyarticleComponent implements OnInit {
  addArticleDialog = false;
  article: Article = {};
  submitted = false;
  userName: string;
  addArticleImage = false;
  uploadeImgaeUrl = 'http://localhost:7277/article/addimage/';
  id: string;
  showImgaeUrl = 'http://localhost:7277/article/getimage/';
  principalArticle: Article[] = [];
  desc: string;
  descdialog = false;
  comments: Comment[] = [];
  showCommentDg = false;
  addCommentDg = false;
  newComment: Comment = {};
  articId: string;
  items!: MenuItem[];
  articleToUpdate: Article = {};
  updateOption = false;

  constructor(private articleService: MyarticleService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.getPrincipalArticle();

    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          this.updateX();
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.deleteX();
        }
      },
      {
        label: 'Update Image', icon: 'pi pi-refresh', command: () => {
          this.updateIX();
        }
      }
    ];
  }

  addNewArticleDialog() {
    this.article = {};
    this.submitted = false;
    this.addArticleDialog = true;
  }

  createArticle() {
    this.submitted = true;
    if (this.article.title) {
      this.id = ulid();
      this.article.id = this.id;
      this.articleService.addNewArticle(this.article, this.userName).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.addArticleDialog = false;
          this.addArticleImage = true;
          this.getPrincipalArticle();
        },
        error: () => {
          this.addArticleDialog = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while Adding this article',
            life: 3000
          });
        }
      });
    }
  }

  getPrincipalArticle() {
    this.articleService.getPrincipalArticle(this.userName).subscribe({
      next: (data) => {
        this.principalArticle = data.reverse();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  errorUplodingImgae() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error while updating profile image',
      life: 3000
    });
  }

  onUpload() {
    this.getPrincipalArticle();
    window.location.reload();
  }

  showDesc(description: string) {
    this.desc = description;
    this.descdialog = true;
  }

  like(id: any) {
    this.articleService.likes(id, this.userName).subscribe({
      next: (data) => {
        console.log(data);
        if (data === 'ok') {
          this.getPrincipalArticle();
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
          this.getPrincipalArticle();
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
          this.getPrincipalArticle();
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

  deleteComment(id: number) {
    this.articleService.deleteComment(id).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.showCommentDg = false;
        this.getPrincipalArticle();
      }, error: (err) => {
        console.log(err);
      }
    });
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
          this.getPrincipalArticle();
        }, error: (err) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Error', life: 3000});
          this.updateOption = false;
          this.addCommentDg = false;
        }
      });
    }
  }


  updateX() {
    this.updateOption = true;
    this.submitted = false;
    this.article = this.articleToUpdate;
    this.addArticleDialog = true;

  }

  updateArticle() {
    this.submitted = true;
    if (this.article.title) {
      this.articleService.updateArticle(this.article).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.updateOption = false;
          this.addArticleDialog = false;
          this.getPrincipalArticle();
        }, error: (err) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Error', life: 3000});
          this.updateOption = false;
          this.addArticleDialog = false;
        }
      });
    }
  }


  updateIX() {
    this.id = this.articleToUpdate.id;
    this.addArticleImage = true;
  }

  deleteX() {
    this.articleService.deleteArticle(this.articleToUpdate.id).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.getPrincipalArticle();
      }, error: (err) => {
        console.log(err);
      }
    });

  }

  getTheArticle(X: Article) {
    this.articleToUpdate = X;
  }
}
