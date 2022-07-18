import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { ModalAnimations } from 'src/app/shared/libraries/modal-animations';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';
import { CreatePageProject } from '../create/create.page';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  projects: Array<Project>;
  user: User;
  isNewProjectModalOpen = false;
  notifierSubscription: Subscription = this.dataService.projectListNotifier.subscribe(notified => {
    this.getListOfProjects();
  });
  modalAnimations: ModalAnimations;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public modalCtrl: ModalController,
    public dataService: DataService,
    public tokenDecode: TokenDecoderService,
    ) {
      this.modalAnimations = ModalAnimations.getModalAnimation();
    }

  ngOnInit() {
    this.getListOfProjects();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
    this.modalCtrl.dismiss();
  }

  getListOfProjects() {
    this.userService.getUser(this.tokenDecode.getId()).subscribe(
      (response) => {
        this.projects = response.projects;
      });
  }

  /**
   * OUVERTURE DU MODAL DE CREATION DE PROJET
   */
  public async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePageProject,
      cssClass: ['namastest-modal', 'namastest-center-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation
    });
    await modal.present();
  }

}
