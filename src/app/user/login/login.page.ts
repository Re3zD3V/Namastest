import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DASHBOARD } from 'src/app/shared/constants/NamedRoutes';
import { TokenStorageService } from 'src/app/shared/services/token/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('pwdInput') pwdInput: IonInput;

  public user: User;
  public show_password: boolean;
  public remember_me: boolean;
  public errors: Array<string>;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {}

  login() {
    if (this.user.email && this.user.password) {
      this.authService
        .login(this.user.email, this.user.password)
        .subscribe((response) => {
          this.tokenStorageService.setToken(response.token);
          this.router.navigate([DASHBOARD]);
        });
    }
  }

  toggleShowPassword(showPassword: boolean) {
    if (showPassword) {
      this.pwdInput.type = 'text';
    } else {
      this.pwdInput.type = 'password';
    }
  }
}
