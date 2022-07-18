import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams, Platform, ToastController } from '@ionic/angular';
import { Catalog } from 'src/app/models/catalog';
import { Test } from 'src/app/models/test';
import { DataService } from 'src/app/services/data.service';
import { TestService } from 'src/app/services/test.service';
import { UserService } from 'src/app/services/user.service';
import { TEST_LIST } from 'src/app/shared/constants/NamedRoutes';
import { CastModelService } from 'src/app/shared/services/cast/cast-model.service';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';

@Component({
  selector: 'app-test-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePageTest implements OnInit {

  test: Test;
  @Input() catalog: Catalog;
  public error = '';
  

  constructor(public testService: TestService, 
    public router: Router, 
    public tokenDecode: TokenDecoderService, 
    public userService: UserService, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public dataService: DataService,
    public navParams: NavParams,
    public castService: CastModelService) {
    this.test = new Test();
    //this.catalog = navParams.get("value");
    this.test.catalogs = new Array<Catalog>();
   }

  ngOnInit() {
  }

  create() {
    
    this.userService.getUser(this.tokenDecode.getId()).subscribe(response => {
      this.test.author = response;
      //this.test.catalogs = new Array<Catalog>;
      if (this.catalog != undefined && this.catalog != null) {
        this.test.catalogs.push(this.catalog);
      }
      this.testService.createTest(this.test).subscribe(response => {
        console.log(response);
        this.dataService.notifyAboutTestChange();
        if (this.test.catalogs.length == 0) {
          this.router.navigate([TEST_LIST]);
        } else {
          this.dataService.notifyAboutCatalogChange();
        }
        this.showSuccessNotification();
      }, 
      err => {
        console.log(err);
        this.showFailureNotification();
      });
    },
    err => {
      console.log(err);
      this.showFailureNotification();
    });
    this.modalCtrl.dismiss();
  }

  public dismissModal() {
    this.modalCtrl.dismiss();
  }

  private async showSuccessNotification() {

    if (this.platform.is('android')) {
      const toast = await this.toastCtrl.create({
        header: `${this.test.title} a été créé!`,
        message: 'Vous pouvez désormais inclure votre test dans des catalogues.',
        duration: 3000
      });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `${this.test.title} a été créé!`,
        message: 'Vous pouvez désormais inclure votre test dans des catalogues.',
        buttons: ["OK"]
      });
      alert.present();
    }
  }

  private async showFailureNotification() {
    const alert = await this.alertCtrl.create({
      header: "Une erreur est survenue sur le serveur",
      message: "Veuillez réessayer plus tard",
      buttons: ['OK']
    });
    alert.present();
  }

}
