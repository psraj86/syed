import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  constructor(private commentService: CommentService) {}
  @Input() comments = [];

  add() {
    this.commentService.add(this.comment);
    this.setText();
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
    this.commentService.delete(comment.id);
    this.setText();
  }

  setText() {
    this.comment = '';
    this.btnText = 'Save';
  }
}
