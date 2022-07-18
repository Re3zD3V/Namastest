import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalog } from 'src/app/models/catalog';
import { Test } from 'src/app/models/test';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { CreatePageTest } from 'src/app/test/create/create.page';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { TestsListModalPage } from './tests-list-modal/tests-list-modal.page';
import { ModalAnimations } from 'src/app/shared/libraries/modal-animations';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  catalog: Catalog;
  id: number;
  isNewTestModalOpen = false;
  testsSelected = new Array<Test>;
  notifierSubscription: Subscription = this.dataService.catalogListNotifier.subscribe(notified => {
    this.catalogService.getCatalog(this.id).subscribe((response) => {
      this.catalog = response;
      console.log(response);
    });
  });
  modalAnimations: ModalAnimations;

  constructor(
    public activatedRoute: ActivatedRoute,
    public catalogService: CatalogService,
    public modalCtrl: ModalController,
    public router: Router,
    public dataService: DataService,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
    this.catalog = new Catalog();
    this.modalAnimations = ModalAnimations.getModalAnimation();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.catalogService.getCatalog(this.id).subscribe((response) => {
      this.catalog = response;
      console.log(response);
    });
  }

  ngOnDestroy() {
    this.modalCtrl.dismiss();
  }

  update() {
    //Update item by taking id and updated data object
    this.catalogService
      .updateCatalog(this.id, this.catalog)
      .subscribe(response => {
        this.router.navigate(['catalog/list']);
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

  deleteFromCatalog() {
    if (this.testsSelected.length > 0) {
      for (let j = 0; j < this.testsSelected.length; j++) {
        for (let i = 0; i < this.catalog.tests.length; i++) {
          if (this.catalog.tests[i].id === this.testsSelected[j].id) {
            this.catalog.tests.splice(i, 1);
          }
        }
      }
      this.catalogService.updateCatalog(this.catalog.id, this.catalog).subscribe(response => {
        this.dataService.notifyAboutCatalogChange();
        this.showSuccessNotificationExclusion();
      },
      (err) => {
        console.log(err);
        this.showFailureNotification();
      });
      this.testsSelected = new Array<Test>;
    }
  }

  private async showSuccessNotificationExclusion() {

    if (this.platform.is('android')) {
      const toast = await this.toastCtrl.create({
        header: `Exclusion`,
        message: 'Les tests sélectionnés ont bien été exclus de ce catalogue.',
        duration: 3000
      });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `Exclusion`,
        message: 'Les tests sélectionnés ont bien été exclus de ce catalogue.',
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

  showConfirmAlert() {
    if (this.testsSelected.length > 0) {
      this.alertCtrl.create({
        header: "!! Exclusion !!",
        message: "Voulez-vous vraiment exclure les tests sélectionnés?",
        buttons: [
          {
            text: "Confirmer",
            handler: () => {
              this.deleteFromCatalog();
            }
          },
          {
            text: "Annuler",
          }
        ]
      }).then(res => {
        res.present();
      });
    }
  }

  /**
   * OUVERTURE D'IMPORTATION DE TESTS
   */
   public async openTestImportModal() {
    const modal = await this.modalCtrl.create({
      component: TestsListModalPage,
      cssClass: ['namastest-modal', 'namastest-list-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation,
      componentProps: { catalog: this.catalog }
    });
    await modal.present();
  }


  /**
   * OUVERTURE DU MODAL DE CREATION DE TEST
   */
   public async openTestModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePageTest,
      cssClass: ['namastest-modal', 'namastest-center-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation,
      componentProps: { catalog: this.catalog }
    });
    await modal.present();
  }
}
