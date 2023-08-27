import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from './../../services/utilities.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatIconModule,
  ],
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);
  UtilitiesService = inject(UtilitiesService);

  form!: FormGroup;

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.form = this.fb.group({
      email: 'admin@gmail.com',
      password: 'admin@123$',
    });
  }

  signIn() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe(
        () => {
          this.router.navigate(['/student']);
        },
        (err: Error) => {
          this.UtilitiesService.showErrorToast(err.message);
        }
      );
    }
  }
}
