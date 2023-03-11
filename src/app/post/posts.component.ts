import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';
import { CreatePostModelComponent } from './create-post-model/create-post-model.component';

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  post$?: Observable<any>;
  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'C ategory 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
  ];
  posts$!: Observable<any>;
  constructor(
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    console.log('Calling...');
    this.posts$ = this.postService.getPosts();
  }

  goToPost(post: any) {
    this.router.navigate(['post', post.id]);
  }

  openPostDialog(post?: any, edit?: boolean) {
    this.dialog
      .open(CreatePostModelComponent, {
        height: '45%',
        width: '35%',
        data: {
          title: edit ? 'Update' : 'Create',
          edit,
          post,
          categories: this.categories,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          if (edit) {
            this.postService
              .updatePost(post.id, { ...post, ...data })
              .subscribe(() => {
                this.getPosts();
              });
          } else {
            this.postService
              .addPost({ ...data, comments: [] })
              .subscribe(() => {
                this.getPosts();
              });
          }
        }
      });
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(
      (res) => {
        console.log('Calling...', res);
        this.getPosts();
      },
      (err) => {
        console.log(err);
        this.getPosts();
      },
      () => {
        this.getPosts();
      }
    );
  }
}
