import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User;
  public passwordConfirm: string;
  public error: string = '';

  constructor(public userService: UserService, public router: Router) {
    this.user = new User();
  }

  ngOnInit() {}

  register() {
    this.userService.createUser(this.user).subscribe((response) => {
      this.router.navigate(['accueil']);
    });
  }
}
