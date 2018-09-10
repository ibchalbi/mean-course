import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      content: ''
    });
   }
   addPost(title, responsible, description, content) {
    this.postService.addPost(title, responsible, description, content).subscribe(() => {
      this.router.navigate(['/list']);
    });
   }
  ngOnInit() {}

}
