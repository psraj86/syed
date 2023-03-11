import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post-model',
  templateUrl: './create-post-model.component.html',
  styleUrls: ['./create-post-model.component.scss'],
})
export class CreatePostModelComponent implements OnInit {
  postForm!: FormGroup;
  post: any;
  categories: any;
  edit!: boolean;
  title!: string;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.post = this.data.post;
    this.edit = this.data.edit;
    this.title = this.data.title;
    this.categories = this.data.categories;
    this.postForm = this.fb.group({
      title: [
        this.data.post?.title ? this.data.post.title : '',
        Validators.required,
      ],
      description: [
        this.data.post?.description ? this.data.post.description : '',
        [Validators.required],
      ],
      categoryId: [
        this.data.post?.categoryId ? this.data.post.categoryId : '',
        Validators.required,
      ],
      content: [
        this.data.post?.content ? this.data.post.content : '',
        [Validators.required],
      ],
    });
  }
}
