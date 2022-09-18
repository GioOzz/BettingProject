import { Component, OnInit } from '@angular/core';
import { UserService, TokenStorageService } from '../UserService';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  permission: string[] = [];
  form: any = { username: null, password: null };

  constructor(private userService: UserService, private tokenService: TokenStorageService) { }
  ngOnInit(): void {
    // if (this.tokenService.getToken()) {
    //   this.isLoggedIn = true;
    //   this.permission = this.tokenService.getUser().roles;
    //   debugger;
    // }
  }
  submit() {      
    const { username, password } = this.form;
    this.userService.login(username, password).subscribe({
      next: data => {
        // debugger;
        console.log(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = '\n' + err.message;
        this.isLoginFailed = true;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}

