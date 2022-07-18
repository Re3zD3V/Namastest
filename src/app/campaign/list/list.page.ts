import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/campaign';
import { Project } from 'src/app/models/project';
import { CampaignService } from 'src/app/services/campaign.service';
import { DataService } from 'src/app/services/data.service';
import { ProjectService } from 'src/app/services/project.service';
import { ModalAnimations } from 'src/app/shared/libraries/modal-animations';
import { CastModelService } from 'src/app/shared/services/cast/cast-model.service';
import { CreateCampaignPage } from '../create/create.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  mobile: boolean;
  project: Project;
  currentPage = 1;
  campaignsSelected: Array<Campaign>;
  isNewCampaignModalOpen = false;
  notifierSubscription: Subscription = this.dataService.campaignListNotifier.subscribe(notified => {
    this.getProject();
  });
  modalAnimations: ModalAnimations;

  reorderCampaigns(event) {
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

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public projectService: ProjectService,
    public campaignService: CampaignService,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public dataService: DataService,
    public castModelService: CastModelService,
    private animationCtrl: AnimationController) {
      this.mobileCheck();
      this.project = new Project();
      this.project.id = this.activatedRoute.snapshot.params['id'];
      this.modalAnimations = new ModalAnimations();
  }

  ngOnInit() {
    this.getProject();
    this.campaignsSelected = [];
  }

  ionViewWillEnter() {
    this.getProject();
  }

  async getProject(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    //Chargement du projet
    this.projectService.getProjectById(this.project).subscribe(
      response => {
        this.project = this.castModelService.jsonToProject(response);
        console.log(this.project);
      }
    ).add(() => {
      //Called when operation is complete (both success and error)
      loading.dismiss();
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.getProject(event);
  }

  //Sélectionne les éléments checked pour suppression ou ajout à un catalogue
  selectMultiple(campaign: Campaign) {
    let index = this.campaignsSelected.indexOf(campaign);
    if (index !== -1) {
      this.campaignsSelected.splice(index, 1);
    } else {
      this.campaignsSelected.push(campaign);
    }
    console.log(this.campaignsSelected);
  }

  deleteCampaigns() {
    for (let i = 0; i < this.campaignsSelected.length; i++) {
      let campaign = this.campaignsSelected[i];
      this.campaignService.deleteCampaignById(campaign.id).subscribe(() => {
        if (i == this.campaignsSelected.length-1) {
          this.getProject();
        }
      });
    }
  }

  showConfirmAlert() {
    if (this.campaignsSelected.length > 0) {
      this.alertCtrl.create({
        header: "!! Suppression !!",
        message: "Voulez-vous vraiment supprimer les campagnes sélectionnées?",
        buttons: [
          {
            text: "Confirmer",
            handler: () => {
              this.deleteCampaigns();
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

  public async openNewCampaignModal() {
    const modal = await this.modalCtrl.create({
      component: CreateCampaignPage,
      cssClass: 'namastest-modal',
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation,
      componentProps: { project: this.project }
    });
    await modal.present();
  }

}
