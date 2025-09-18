import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "wz-profile",
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1 class="text-2xl font-bold">My Profile</h1>
    <p class="text-sm text-slate-600 dark:text-neutral-400 mb-6">
      Manage your account information and settings
    </p>

    <div class="flex items-center gap-2 mb-4">
      <button class="tab tab-active">Profile</button>
      <button class="tab">Password</button>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="text-base font-semibold">Personal Information</div>
        <p class="field-hint">
          Update your personal information and profile details
        </p>
      </div>
      <div class="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Full Name</label>
          <input
            class="input"
            placeholder="Enter your full name"
            [(ngModel)]="fullName"
          />
        </div>
        <div>
          <label class="label">Email</label>
          <input
            class="input"
            placeholder="Enter your email"
            [(ngModel)]="email"
          />
          <p class="field-hint">
            This is the email address used for account notifications.
          </p>
        </div>
        <div>
          <label class="label">Location</label>
          <input
            class="input"
            placeholder="Enter your location"
            [(ngModel)]="location"
          />
          <p class="field-hint">
            This helps match you with nearby opportunities.
          </p>
        </div>
        <div>
          <label class="label">Skills</label>
          <input
            class="input"
            placeholder="Add your skills..."
            [(ngModel)]="skillsText"
          />
        </div>
        <div class="md:col-span-2">
          <label class="label">Bio</label>
          <textarea
            class="input h-32"
            placeholder="Tell us about yourself"
            [(ngModel)]="bio"
          ></textarea>
        </div>
        <div class="md:col-span-2">
          <button class="btn btn-primary px-5 py-2" (click)="save()">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProfilePage {
  private auth = inject(AuthService);

  fullName = this.auth.user()?.fullName ?? "";
  email = this.auth.user()?.email ?? "";
  location = this.auth.user()?.location ?? "";
  skillsText = (this.auth.user()?.skills ?? []).join(", ");
  bio = this.auth.user()?.bio ?? "";

  save() {
    this.auth.updateProfile({
      fullName: this.fullName,
      email: this.email,
      location: this.location,
      skills: this.skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bio: this.bio,
    });
    alert("Profile updated");
  }
}
