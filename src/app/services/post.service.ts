import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url =
    'http://blogapp-env.eba-dmaptfmp.us-east-1.elasticbeanstalk.com/api/v1/posts';
  constructor(private http: HttpClient) {}
  posts = {
    content: [
      {
        id: 1,
        title: 'Mona new post1 is updated',
        description: 'Mona post description1 is updated',
        content: 'This is my post1 Mona is updated',
        comments: [],
        categoryId: 1,
      },
      {
        id: 2,
        title: 'Mona new post2',
        description: 'Mona post description2',
        content: 'This is my post2 Mona',
        comments: [],
        categoryId: 2,
      },
      {
        id: 3,
        title: 'Mona new post3',
        description: 'Mona post3 description1',
        content: 'This is my post3 Mona',
        comments: [],
        categoryId: 2,
      },
      {
        id: 4,
        title: 'Mona new post4',
        description: 'Mona post4 description4',
        content: 'This is my post4 Mona',
        comments: [],
        categoryId: 2,
      },
      {
        id: 6,
        title: 'Mona new post6',
        description: 'Mona post6 description4',
        content: 'This is my post6 Mona',
        comments: [],
        categoryId: 2,
      },
      {
        id: 7,
        title: 'Mona new post 1 for 9-Mar-2023',
        description: 'Mona post 1 description',
        content: 'This is my post1 Mona',
        comments: [],
        categoryId: 1,
      },
    ],
    pageNo: 0,
    pageSize: 10,
    totalElements: 6,
    totalPages: 1,
    last: true,
  };
  posts$: BehaviorSubject<any> = new BehaviorSubject<any>(this.posts);
  post$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  addPost(post: any) {
    this.posts.content = [...this.posts.content, post];
    this.posts$.next(this.posts);
  }
  getPost(id: number) {
    this.posts$.subscribe((posts) => {
      console.log(posts);
      const post = posts.content.find((post: any) => post.id == id);
      console.log(post);
      this.post$.next(post);
    });
  }

  deletePost(id: number) {
    this.posts.content = this.posts.content.filter((p) => p.id !== id);
    this.posts$.next(this.posts);
  }

  updatePost(id: number, updatedPost: any) {
    const index = this.posts.content.findIndex((p) => p.id === id);
    if (index > -1) {
      this.posts.content[index] = updatedPost;
      this.posts$.next(this.posts);
    } else {
      alert('Id not found');
    }
  }
  getData() {
    return this.http.get(this.url);
  }
}
