import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }


  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
  }

  registerUser() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = this.registerForm.value;
      this.userService.register(registerData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            localStorage.setItem('token', response.body.token);
            localStorage.setItem('userId', response.body.user._id);
          }
        },
        error: (e) => console.error(e),
        complete: () => {
          this.router.navigate(['/todoapp']);
        }
      }
      );
  }
}
