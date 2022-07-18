import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePageCatalog } from '../catalog/create/create.page';
import { CreatePageProject } from '../project/create/create.page';
import { ModalAnimations } from '../shared/libraries/modal-animations';
import { CreatePageTest } from '../test/create/create.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  state: any;
  modalAnimations: ModalAnimations;

  constructor(
    public modalCtrl: ModalController
    ) {
      this.modalAnimations = ModalAnimations.getModalAnimation();
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.modalCtrl.dismiss();
  }


  /**
   * OUVERTURE DU MODAL DE CREATION DE PROJET
   */
   public async openProjectModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePageProject,
      cssClass: ['namastest-modal', 'namastest-center-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation
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
      leaveAnimation: this.modalAnimations.leaveAnimation
    });
    await modal.present();
  }

  /**
   * OUVERTURE DU MODAL DE CREATION DE CATALOGUE
   */
   public async openCatalogModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePageCatalog,
      cssClass: ['namastest-modal', 'namastest-center-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation
    });
    await modal.present();
  }
  

}
