import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$ = this.postService.post$;

  comments: any;
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private postService: PostService
  ) {}
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(+this.id);
    this.post$.subscribe((res) => {
      console.log('data', res);
    });
    this.commentService.comments$.subscribe((comments) => {
      this.comments = comments;
    });
  }
}
