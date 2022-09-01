import { Component } from '@angular/core';
import { UserService } from '../UserService';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: any = {
    username: null,
    password: null,
    mail: null
  };

  constructor(private userService: UserService) { }

  submit() {
    const { username, password, email } = this.form;
    this.userService.register(username, password, email).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.errorMessage = '\n' + err.message;
        this.isSignUpFailed = true;
      }
    });
  }
}