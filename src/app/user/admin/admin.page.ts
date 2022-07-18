import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public usersData = [];
  public currentPage = 1;

  constructor(public userService: UserService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.getAllUsers();
  }

  // Get saved list of users
  async getAllUsers(event?) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.userService.getUsersList(this.currentPage).subscribe(
      (response) => {
        loading.dismiss();
        this.usersData = response;
        console.log(this.usersData);
        event?.target.complete();
        if (event) {
          event.target.disabled = response.total_pages === this.currentPage;
        }
      },
      (err) => {
        loading.dismiss();
      }
    );
  }

  loadMore(event) {
    this.currentPage++;
    this.getAllUsers(event);
  }
}
