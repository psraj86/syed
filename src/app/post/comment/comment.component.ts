import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  comment: any;
  btnText = 'Save';
  updatedComment: any = {};
  @Input() post$!: Observable<any>;
  post: any;
  comments$!: Observable<any>;
  constructor(private commentService: CommentService) {}

  ngAfterViewInit(): void {
    this.post$.subscribe((post) => {
      this.post = post;
      this.getComments();
    });
  }

  getComments() {
    if (this.post) {
      this.comments$ = this.commentService.getCommentByPostId(this.post.id);
    }
  }

  add() {
    this.commentService.add(this.comment, this.post.id).subscribe((res) => {
      this.setText();
      this.getComments();
    });
  }

  setComment(comment: any) {
    this.btnText = 'Edit';
    this.updatedComment = comment;
    console.log(comment, this.updatedComment);
    this.comment = comment.body;
  }

  update() {
    this.commentService.edit({ ...this.updatedComment, body: this.comment });
    this.setText();
  }

  delete(comment: any) {
    this.commentService.delete(comment.id, this.post.id).subscribe(
      (res) => {
        this.setText();
        this.getComments();
      },
      (err) => {
        this.getComments()
      }
    );
  }

  setText() {
    this.comment = '';
    this.btnText = 'Save';
  }
}
