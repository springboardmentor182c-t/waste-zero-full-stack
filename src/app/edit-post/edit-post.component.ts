import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  originalPost?: Post;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    // load a sample post (in a real app you'd fetch by id)
    this.loading = true;
    this.postService.getSamplePost().subscribe({
      next: (p) => {
        this.originalPost = p;
        this.form = this.fb.group({
          title: [p.title, [Validators.required, Validators.minLength(5)]],
          content: [p.content, [Validators.required, Validators.minLength(10)]],
          tags: [p.tags.join(', ')],
          published: [p.published]
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load post.';
        this.loading = false;
      }
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (!this.form) return;
    this.error = null;
    this.successMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const updated: Post = {
      id: this.originalPost?.id || '',
      title: this.f.title.value,
      content: this.f.content.value,
      tags: (this.f.tags.value || '').split(',').map((t:string)=>t.trim()).filter(Boolean),
      published: this.f.published.value
    };

    this.loading = true;
    this.postService.updatePost(updated).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'Post updated successfully.';
        // allow user to see updated state
        this.originalPost = res;
        // reset form touched state
        this.form.markAsPristine();
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Update failed. Please try again.';
      }
    });
  }

  // helper for small teaching moment: produce a preview object
  preview() {
    if (!this.form) return null;
    return {
      title: this.f.title.value,
      contentSnippet: (this.f.content.value || '').slice(0,120),
      tags: (this.f.tags.value || '').split(',').map((s:string)=>s.trim()).filter(Boolean),
      published: this.f.published.value
    };
  }
}
