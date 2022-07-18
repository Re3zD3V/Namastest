import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateCampaignPage } from 'src/app/campaign/create/create.page';
import { Campaign } from 'src/app/models/campaign';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { ModalAnimations } from 'src/app/shared/libraries/modal-animations';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  project: Project;
  modalAnimations: ModalAnimations;

  constructor(
    public activatedRoute: ActivatedRoute,
    public projectService: ProjectService,
    public modalCtrl: ModalController,
  ) {
    this.project = new Project();
    this.modalAnimations = ModalAnimations.getModalAnimation();
  }

  ngOnInit() {
    this.project.id = this.activatedRoute.snapshot.params['id'];
    this.projectService.getProjectById(this.project).subscribe(response => {
      this.project = Object.setPrototypeOf(response, Project.prototype);
      console.log("mon projet: " + this.project);
      this.project.author = Object.setPrototypeOf(response.author, User.prototype);
      this.project.campaigns.map(campaign => {
        return Object.setPrototypeOf(campaign, Campaign.prototype);
      });
      this.project.contributors.map(contributor => {
        return Object.setPrototypeOf(contributor, User.prototype);
      });
    });
  }

  ngOnDestroy() {
    this.modalCtrl.dismiss();
  }

  public async openNewCampaignModal() {
    const modal = await this.modalCtrl.create({
      component: CreateCampaignPage,
      cssClass: ['namastest-modal', 'namastest-list-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation,
      componentProps: { project: this.project }
    });
    await modal.present();
  }

  public async openDeleteProjectModal() {
    const modal = await this.modalCtrl.create({
      component: DeleteComponent,
      cssClass: ['namastest-modal', 'namastest-center-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation,
      componentProps: { project: this.project }
    });
    await modal.present();
  }
  
}
