import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Post } from '../../post.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  posts: Post[];
  displayedColumns = ['title', 'responsible', 'content', 'date', 'actions'];
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.fetchPosts();
  }
  fetchPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
        this.posts = data;
        console.dir('data requested');
        console.dir(this.posts);
    });
  }

  editPost(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deletePost(id) {
    this.postService.deletePost(id).subscribe(() => {
      this.fetchPosts();
    });
  }

}
