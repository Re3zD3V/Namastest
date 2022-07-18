import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, Platform, ToastController } from '@ionic/angular';
import { Catalog } from 'src/app/models/catalog';
import { Test } from 'src/app/models/test';
import { CatalogService } from 'src/app/services/catalog.service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tests-list-modal',
  templateUrl: './tests-list-modal.page.html',
  styleUrls: ['./tests-list-modal.page.scss'],
})
export class TestsListModalPage implements OnInit {

  @Input() catalog: Catalog;
  public userTests = new Array<Test>;
  public testsSelected = new Array<Test>;

  constructor(
    protected navParams: NavParams,
    private catalogService: CatalogService,
    private userService: UserService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public dataService: DataService,
    public modalCtrl: ModalController
  ) { 
    this.catalog = navParams.get("value");
  }

  ngOnInit() {
    this.userService.getUser(this.catalog.author.id).subscribe(response => {
      this.userTests = response.tests;
    });
  }

  selectMultiple(test: Test) {
    let index = this.testsSelected.indexOf(test);
    if (index !== -1) {
      this.testsSelected.splice(index, 1);
    } else {
      this.testsSelected.push(test);
    }
    console.log(this.testsSelected);
  }

  importTests() {
    this.testsSelected.forEach(test =>{
      this.catalog.tests.push(test);
    });
    this.catalogService.updateCatalog(this.catalog.id, this.catalog).subscribe(response => {
      this.showSuccessNotificationImport();
      this.dataService.notifyAboutCatalogChange();
      this.modalCtrl.dismiss();
    },
    (err) => {
      this.showFailureNotification();
      this.modalCtrl.dismiss();
    });
  }

  private async showSuccessNotificationImport() {

    if (this.platform.is('android')) {
      const toast = await this.toastCtrl.create({
        header: `Importer des tests`,
        message: 'Les tests sélectionnés ont bien été ajoutés au catalogue.',
        duration: 3000
      });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `Importer des tests`,
        message: 'Les tests sélectionnés ont bien été importés au catalogue.',
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

  public dismissModal() {
    this.modalCtrl.dismiss();
  }

}
