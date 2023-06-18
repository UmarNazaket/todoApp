import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.message = '';
      this.userService.login(loginData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            localStorage.setItem('token', response.body.token);
            localStorage.setItem('userId', response.body.user._id);
          } else {
            this.message = response.description.message;
          }
        },
        error: (e) => console.error(e),
        complete: () => {
          this.router.navigate(['/todoapp']);
        }
      }
      );
    } else {
      this.message = 'Invalid form!';
    }
  }
}
