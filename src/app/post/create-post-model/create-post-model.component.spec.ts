import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostModelComponent } from './create-post-model.component';

describe('CreatePostModelComponent', () => {
  let component: CreatePostModelComponent;
  let fixture: ComponentFixture<CreatePostModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
