import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, Platform, ModalController } from '@ionic/angular';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { PROJECT_LIST } from 'src/app/shared/constants/NamedRoutes';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePageProject implements OnInit {
  project: Project;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public projectService: ProjectService,
    public router: Router,
    public modalCtrl: ModalController,
    public userService: UserService,
    public tokenDecode: TokenDecoderService,
    public dataService: DataService,
  ) {
    this.project = new Project();
    this.project.author = new User();
  }

  ngOnInit() {
  }

  public submitProject() {
    this.project.author.id = this.tokenDecode.getId();
    this.projectService.registerNewProject(this.project).subscribe(
      data => {
        console.log(data);
        this.dataService.notifyAboutProjectChange();
        this.router.navigate([PROJECT_LIST]);
        this.showSuccessNotification();
      },
      err => {
        console.log(err);
        this.showFailureNotification();
      });
      this.dismissModal();
  }

  public dismissModal() {
    this.modalCtrl.dismiss();
  }

  private async showSuccessNotification() {

    if (this.platform.is('android')) {
      const toast = await this.toastCtrl.create({
        header: `${this.project.name} a été créé!`,
        message: 'Vous pouvez désormais commencer à inviter des participants et créer des campagnes de test!',
        duration: 3000
      });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `${this.project.name} a été créé!`,
        message: 'Vous pouvez désormais commencer à inviter des participants et créer des campagnes de test!',
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

}
