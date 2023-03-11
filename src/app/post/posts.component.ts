import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { CreatePostModelComponent } from './create-post-model/create-post-model.component';

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: any;
  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
  ];
  constructor(
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.postService.posts$.subscribe((res) => {
      this.posts = res.content;
    });

    // this.postService
    //   .getData()
    //   .subscribe((res) => console.log('Final Res -->', res));
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
            this.postService.updatePost(post.id, { ...post, ...data });
          } else {
            let id = 1;
            if (this.posts.length) {
              id = Math.max(...this.posts.map((item: any) => item.id)) + 1;
            }

            this.postService.addPost({ ...data, comments: [], id });
          }
        }
      });
  }

  deletePost(post: any) {
    this.postService.deletePost(+post.id);
  }
}
