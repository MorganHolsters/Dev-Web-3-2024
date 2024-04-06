import { Component, ViewChild, OnInit, Output, EventEmitter, output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Post } from '../../models/Post';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter(); 
  form: FormGroup;

  isOpen = false;

  constructor(private authService: AuthService, private postService: PostService) {}

  ngOnInit(): void{
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(5)]),
      body: new FormControl("", [Validators.required, Validators.minLength(10)]),
    });
  }

  onSubmit(formData : Pick<Post, "title" | "body">): void {
    this.postService.createPost(formData, this.authService.userId).pipe(first()).subscribe(() => {
      this.create.emit(null);
    });
    this.form.reset();
    this.formDirective.resetForm();
  }
}
