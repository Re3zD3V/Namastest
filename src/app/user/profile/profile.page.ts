import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userId: number;
  public user: User;
  public passwordConfirm: string;
  public errors: Array<string>;

  
  constructor(public activatedRoute: ActivatedRoute, 
    public router: Router, public userService: UserService,
    public tokenDecoder: TokenDecoderService) 
  {
    this.userId = this.tokenDecoder.getId();
    this.user = new User();
  }

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe(
      (response) => {
        this.user = response;
      }
    );
  }
  
  update() {
    this.userService.updateUser(this.userId, this.user).subscribe(response => {
    this.router.navigate(['dashboard']);
    });
  }
  
}
