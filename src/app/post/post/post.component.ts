import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  comments$!: Observable<any>;
  post$!: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private postService: PostService
  ) {}
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postService.getPost(+this.id);
  }
}
