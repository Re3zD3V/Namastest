import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Test } from 'src/app/models/test';
import { DataService } from 'src/app/services/data.service';
import { TestService } from 'src/app/services/test.service';
import { UserService } from 'src/app/services/user.service';
import { ModalAnimations } from 'src/app/shared/libraries/modal-animations';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';
import { CreatePageTest } from '../create/create.page';
import { AddToCatalogModalPage } from './add-to-catalog-modal/add-to-catalog-modal.page';

@Component({
  selector: 'app-test-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  mobile: boolean;
  tests: Array<Test>;
  currentPage = 1;
  testsSelected: Array<Test>;
  isNewTestModalOpen = false;
  isAddToCatalogModalOpen = false;
  notifierSubscription: Subscription = this.dataService.testListNotifier.subscribe(notified => {
    this.getAllTests();
  });
  modalAnimations: ModalAnimations;

  reorderTests(event) {
    event.detail.complete();
  }

  mobileCheck() {
    if (window.innerWidth > 768) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobileCheck();
  }

  constructor(public testService: TestService,
    public router: Router,
    private loadingCtrl: LoadingController,
    public userService: UserService,
    public tokenDecode: TokenDecoderService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public dataService: DataService) {
    this.mobileCheck();
    this.modalAnimations = ModalAnimations.getModalAnimation();
  }

  ngOnInit() {
    this.getAllTests();
    this.testsSelected = [];
  }

  ionViewWillEnter() {
    this.getAllTests();
  }

  async getAllTests(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    //Chargement de l'utilisateur connecté et affichage de ses tests
    this.userService.getUser(this.tokenDecode.getId()).subscribe(response => {
      loading.dismiss();
      this.tests = response.tests;
    },
      (err) => {
        console.log(err);
        loading.dismiss();
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.getAllTests(event);
  }

  //Sélectionne les éléments checked pour suppression ou ajout à un catalogue
  selectMultiple(test: Test) {
    let index = this.testsSelected.indexOf(test);
    if (index !== -1) {
      this.testsSelected.splice(index, 1);
    } else {
      this.testsSelected.push(test);
    }
    console.log(this.testsSelected);
  }

  deleteTests() {
    for (let i = 0; i < this.testsSelected.length; i++) {
      let test = this.testsSelected[i];
      this.testService.deleteTest(test.id).subscribe(() => {
        if (i == this.testsSelected.length-1) {
          this.getAllTests();
        }
        //TODO: Message d'erreur de suppression quand le test est dans une campagne
      });
    }
  }

  showConfirmAlert() {
    if (this.testsSelected.length > 0) {
      this.alertCtrl.create({
        header: "!! Suppression !!",
        message: "Voulez-vous vraiment supprimer les tests sélectionnés?",
        buttons: [
          {
            text: "Confirmer",
            handler: () => {
              this.deleteTests();
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

  ngOnDestroy() {
    this.modalCtrl.dismiss();
  }

  /**
   * OUVERTURE DU MODAL DE CREATION DE TEST
   */
  public async openTestModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePageTest,
      cssClass: ['namastest-modal', 'namastest-center-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation
    });
    await modal.present();
  }

  public setAddToCatalogModalOpen() {
    if (this.testsSelected.length >0) {
    this.openAddToCatalogModal();
    }
  }

  async openAddToCatalogModal() {
    const modal = await this.modalCtrl.create({
      component: AddToCatalogModalPage,
      componentProps: {value: this.testsSelected}
    });
    return await modal.present();
  }

}
