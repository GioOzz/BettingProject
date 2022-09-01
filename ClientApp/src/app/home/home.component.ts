import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../UserService';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  logged : any;
  constructor(private userservice : UserService) {
    this.logged = userservice._currentuser.idUser;
  }
  ngOnInit() {
  }
}
