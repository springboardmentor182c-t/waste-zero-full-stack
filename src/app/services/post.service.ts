import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable()
export class PostService {
  // This service is a stub. Replace HTTP calls with HttpClient in a real app.
  private sample: Post = {
    id: 'abc123',
    title: 'Sample Post Title',
    content: 'This is some example content for the post. Replace this with the real text from your backend.',
    tags: ['waste','recycling'],
    published: false
  };

  getSamplePost(): Observable<Post> {
    return of(this.sample).pipe(delay(400));
  }

  updatePost(p: Post): Observable<Post> {
    // pretend to save and return updated object
    this.sample = { ...p };
    return of(this.sample).pipe(delay(600));
  }
}
