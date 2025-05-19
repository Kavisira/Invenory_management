import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login-component',
  imports: [
    MatGridListModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {
    // Initialize the form controls or any other logic here
  }

  login() {
    this.errorMessage = '';
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      const username = this.usernameFormControl.value;
      const password = this.passwordFormControl.value;
      if (username === 'admin' && password === 'admin') {
        this.auth.login('admin');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
  }
}
} 
