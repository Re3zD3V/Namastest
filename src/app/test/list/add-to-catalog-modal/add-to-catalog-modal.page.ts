import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams, Platform, ToastController } from '@ionic/angular';
import { Catalog } from 'src/app/models/catalog';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { CatalogService } from 'src/app/services/catalog.service';
import { UserService } from 'src/app/services/user.service';
import { TEST_LIST } from 'src/app/shared/constants/NamedRoutes';
import { CastModelService } from 'src/app/shared/services/cast/cast-model.service';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';

@Component({
  selector: 'app-add-to-catalog-modal',
  templateUrl: './add-to-catalog-modal.page.html',
  styleUrls: ['./add-to-catalog-modal.page.scss'],
})
export class AddToCatalogModalPage implements OnInit {

  userCatalogs: Array<Catalog>;
  testsSelected: Array<Test>;

  constructor(
    public userService: UserService,
    public tokenDecode: TokenDecoderService,
    public catalogService: CatalogService,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public castService: CastModelService) {
    this.userService.getUser(this.tokenDecode.getId()).subscribe(response => {
      this.userCatalogs = response.catalogs;
      this.testsSelected = navParams.get("value");
      this.testsSelected.map((test)=>{
        return castService.jsonToTest(test);
      })
    });
   }

  ngOnInit() {
  }

  addToCatalog(catalog: Catalog) {
    if (catalog.tests == undefined){
      catalog.tests = new Array<Test>;
    }
    this.testsSelected.forEach((test) => {
      catalog.tests.push(test);
    });
    this.catalogService.updateCatalog(catalog.id, catalog).subscribe(response => {
      console.log(response);
      this.showSuccessNotification(catalog);
    },
    err => {
      console.log(err);
      this.showFailureNotification();
    });
    this.modalCtrl.dismiss();
  }

  private async showSuccessNotification(catalog: Catalog) {

    if (this.platform.is('android')) {
      const toast = await this.toastCtrl.create({
        header: `Ajout effectué!`,
        message: `Les tests sélectionnés ont bien été ajoutés au catalogue : ${catalog.title}`,
        duration: 3000
      });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `Ajout effectué!`,
        message: `Les tests sélectionnés ont bien été ajoutés au catalogue : ${catalog.title}`,
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.router.navigate([TEST_LIST]);
            }
          }
        ]
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
