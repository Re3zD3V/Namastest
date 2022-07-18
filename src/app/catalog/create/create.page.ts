import { Component, OnInit } from '@angular/core';
import { Catalog } from '../../models/catalog';
import { CatalogService } from '../../services/catalog.service';
import { Router } from '@angular/router';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-catalog-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePageCatalog implements OnInit {
  catalog: Catalog;
  public error = '';

  constructor(public catalogService: CatalogService, 
    public router: Router, 
    public tokenDecode: TokenDecoderService, 
    public userService: UserService, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public dataService: DataService) {
    this.catalog = new Catalog();
  }
  ngOnInit() {}

  create() {
    this.userService.getUser(this.tokenDecode.getId()).subscribe(response => {
      this.catalog.author = response;
      this.catalogService.createCatalog(this.catalog).subscribe(response => {
        console.log(response);
        this.dataService.notifyAboutCatalogChange();
        this.showSuccessNotification();
      },
      err => {
        console.log(err);
        this.showFailureNotification();
      })
    },
    err => {
      console.log(err);
      this.showFailureNotification();
    });
    this.dismissModal();
  }

  private async showSuccessNotification() {

    if (this.platform.is('android')) {
      const toast = await this.toastCtrl.create({
        header: `${this.catalog.title} a été créé!`,
        message: 'Vous pouvez désormais inclure des tests dans votre catalogue et l\'inclure dans des campagnes.',
        duration: 3000
      });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `${this.catalog.title} a été créé!`,
        message: 'Vous pouvez désormais inclure des tests dans votre catalogue et l\'inclure dans des campagnes.',
        buttons: ['OK']
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

  public dismissModal() {
    this.modalCtrl.dismiss();
  }

}
