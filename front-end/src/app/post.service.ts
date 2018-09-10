import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }
  getPosts() {
    return this.http.get(`${this.uri}/posts`);
  }
  getPostById (id) {
    return this.http.get(`${this.uri}/posts/${id}`);
  }
  addPost (title, responsible, description, content) {
    const post = {
      title: title,
      responsible: responsible,
      description: description,
      content: content
    };
    return this.http.post(`${this.uri}/posts/add`, post);
  }

  updatePost (id, title, responsible, description, content) {
    const post = {
      title: title,
      responsible: responsible,
      description: description,
      content: content
    };
    return this.http.post(`${this.uri}/posts/update/${id}`, post);
  }

  deletePost (id) {
    return this.http.get(`${this.uri}/posts/delete/${id}`);
  }
}
