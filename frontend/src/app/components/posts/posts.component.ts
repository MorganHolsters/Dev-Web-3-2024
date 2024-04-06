import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts$: Observable<Post[]>;
  userId: Pick<User, 'id'> | number;

  constructor(private postService: PostService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.posts$ = this.fetchAll();
    this.userId = this.authService.userId
  }

  fetchAll(): Observable<Post[]> {
    return this.postService.fetchAll()
  }

  createPost(): void{
    this.posts$ = this.fetchAll()
  }

  delete(postId: Post["id"]): void{
    this.postService
    .deletePost(postId)
    .subscribe(() => (this.posts$ = this.fetchAll()));
    }
}
