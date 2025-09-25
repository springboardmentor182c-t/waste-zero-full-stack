import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = { localId: "someid", displayName: "somename" };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.canAccess();

    if (this.auth.isAuthenticated()) {
      this.auth.detail().subscribe({
        next: (response: any) => {
          if (response.success) {
            // Set user data from response
            this.user.localId = response.data._id;
            this.user.displayName = response.data.name || response.data.username || '';
          }
        },
        error: (err) => {
          console.error('Error fetching profile details', err);
        }
      });
    }
  }
}
