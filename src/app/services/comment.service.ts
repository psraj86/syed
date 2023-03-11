import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  comments = [
    {
      id: 1,
      name: 'monika',
      email: 'monika@gmail.com',
      body: 'this ia very nice post',
    },
    {
      id: 2,
      name: 'monika',
      email: 'monika@gmail.com',
      body: 'comment 2 this ia very nice post  ',
    },
  ];
  comments$: BehaviorSubject<any> = new BehaviorSubject<any>(this.comments);
  constructor(private postService: PostService) {}

  getCommentByPostId(postId: any) {}

  add(comment: any) {
    let id = 1;
    if (this.comments.length) {
      id = Math.max(...this.comments.map((c) => c.id)) + 1;
    }
    const { name, email } = this.generateRandomName();
    this.comments.push({ id, name, email, body: comment });
    this.comments$.next(this.comments);
  }

  edit(comment: any) {
    const index = this.comments.findIndex((c) => c.id === comment.id);
    this.comments[index] = { ...this.comments[index], ...comment };
    this.comments$.next(this.comments);
  }

  delete(id: number) {
    this.comments = this.comments.filter((comment) => comment.id !== id);
    this.comments$.next(this.comments);
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
