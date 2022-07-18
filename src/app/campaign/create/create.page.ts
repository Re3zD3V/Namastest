import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Campaign } from 'src/app/models/campaign';
import { Project } from 'src/app/models/project';
import { CampaignService } from 'src/app/services/campaign.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreateCampaignPage implements OnInit {

  public title: string;
  public details: string;
  public startDate;
  public endDate;
  public today;
  public tester;

  @Input() project: Project;

  constructor(private campaignService: CampaignService,private notificationService: NotificationService, private modalCtrl: ModalController, public dataService: DataService) {
    this.today = new Date().toISOString().substring(0, 10);
    this.startDate = this.today;
    this.endDate = this.today;
  }

  ngOnInit() {}

  public createCampaign() {
    let campaign = new Campaign();
    campaign.title = this.title;
    campaign.details = this.details;
    campaign.project = `/api/projects/${this.project.id}`;
    campaign.state = `/api/campaign_states/1`;
    campaign.tester = `/api/users/${this.tester}`;
    campaign.predictedStartDate = this.startDate;
    campaign.predictedEndDate = this.endDate;

    this.campaignService.registerNewCampaign(campaign).subscribe(
      data => {
        this.dataService.notifyAboutCampaignChange();
        this.notificationService.showSuccess("Vous pouvez désormais commencer à inviter des participants et ajouter des tests!", "Nouvelle campagne de test créée!");
      },
      err => {
        this.notificationService.showWarning("Veuillez recommencer l'opération de création de la campagne!", "Une erreur est survenue!");
      }
    );
    this.modalCtrl.dismiss();
  }

  public selectTester(event) {
    this.tester = event.target.value;
  }

  public dismissModal() {
    this.modalCtrl.dismiss();
  }

}
