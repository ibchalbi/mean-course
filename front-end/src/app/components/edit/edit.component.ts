import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Post } from '../../Post.module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: String;
  post: any = {};
  updateForm: FormGroup;

  constructor(private postService: PostService, private router: Router,
    private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
      this.createForm();
    }

    createForm() {
      this.updateForm = this.fb.group({
        title: ['', Validators.required],
        responsible: '',
        description: '',
        content: ''
      });
    }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.postService.getPostById(this.id).subscribe(res => {
        this.post = res;
        this.updateForm.get('title').setValue(this.post.title);
        this.updateForm.get('responsible').setValue(this.post.responsible);
        this.updateForm.get('description').setValue(this.post.description);
        this.updateForm.get('content').setValue(this.post.content);
      });
    });
  }

  updatePost (title, responsible, description, content) {
    this.postService.updatePost(this.id, title, responsible, description, content).subscribe(() => {
      this.snackBar.open('Post updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
