import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, RouterOutlet],
})
export class MainComponent {
  auth = inject(AuthService);

  logout() {
    // Clear the token from localStorage
    this.auth.logout();
  }
}
