import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  // ✅ Add NgIf and NgFor here explicitly
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  postForm!: FormGroup;
  postId!: string;
  isLoading = true;
  isSaving = false;
  message = '';

  private apiUrl = 'http://localhost:3000/posts';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();
    this.loadPost();
  }

  initForm(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      location: [''],
      status: ['pending', Validators.required]
    });
  }

  loadPost(): void {
    if (!this.postId) {
      this.message = 'Invalid post ID.';
      this.isLoading = false;
      return;
    }

    this.http.get<any>(`${this.apiUrl}/${this.postId}`).subscribe({
      next: (data) => {
        if (data) this.postForm.patchValue(data);
        else this.message = 'Post not found.';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.message = '⚠️ Failed to load post details.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    this.isSaving = true;
    this.http.put(`${this.apiUrl}/${this.postId}`, this.postForm.value).subscribe({
      next: () => {
        this.message = '✅ Post updated successfully!';
        setTimeout(() => this.router.navigate(['/posts']), 1500);
      },
      error: (err) => {
        console.error('Error updating post:', err);
        this.message = '❌ Failed to update post.';
        this.isSaving = false;
      },
      complete: () => (this.isSaving = false)
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/posts']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.postForm.get(controlName);
    return !!(control && control.hasError(errorName) && control.touched);
  }
}
