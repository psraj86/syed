import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url =
    'http://blogapp-env.eba-dmaptfmp.us-east-1.elasticbeanstalk.com/api/v1/posts';
  constructor(private http: HttpClient) {}
  posts = {};
  posts$: BehaviorSubject<any> = new BehaviorSubject<any>(this.posts);
  post$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  addPost(post: any) {
    return this.http.post(this.url, post);
  }
  getPosts(): Observable<any> {
    // const headers = new HttpHeaders({
    //   ''
    // })
    return this.http.get<any>(this.url);
  }
  getPost(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  updatePost(id: number, updatedPost: any) {
    return this.http.put(this.url + '/' + +id, updatedPost);
  }
  // getData() {
  //   return this.http.get(this.url).subscribe((res) => console.log(res));
  // }
}
