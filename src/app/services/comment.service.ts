import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url =
    'http://blogapp-env.eba-dmaptfmp.us-east-1.elasticbeanstalk.com/api/v1/posts/';
  constructor(private postService: PostService, private http: HttpClient) {}

  getCommentByPostId(postId: any) {
    const url = `${this.url}${postId}/comments`;

    return this.http.get(url);
  }

  add(comment: any, postId: number) {
    const { name, email } = this.generateRandomName();
    const newComment = { name, email, body: comment };
    const url = `${this.url}${postId}/comments`;
    return this.http.post(url, newComment);
  }

  edit(comment: any, postId: number) {
    const url = `${this.url}${postId}/comments/${comment.id}`;
    return this.http.put(url, comment);
  }

  delete(id: number, postId: number) {
    const url = `${this.url}${postId}/comments/${id}`;
    return this.http.delete(url);
  }

  generateRandomName() {
    const firstNames = [
      'Emma',
      'Olivia',
      'Ava',
      'Isabella',
      'Sophia',
      'Mia',
      'Charlotte',
      'Amelia',
      'Harper',
      'Evelyn',
      'Abigail',
      'Emily',
      'Elizabeth',
      'Mila',
      'Ella',
      'Avery',
      'Sofia',
      'Camila',
      'Aria',
      'Scarlett',
    ];
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Jones',
      'Brown',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
      'Hernandez',
      'Lopez',
      'Gonzalez',
      'Perez',
      'Taylor',
      'Anderson',
      'Wilson',
      'Jackson',
      'Moore',
      'Lee',
    ];

    // Generate a random first name and last name
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];

    // Concatenate the first and last name to create a full name
    const randomName = randomFirstName + ' ' + randomLastName;
    return {
      name: randomName,
      email: randomFirstName + randomLastName + '@gmail.com',
    };
  }
}
