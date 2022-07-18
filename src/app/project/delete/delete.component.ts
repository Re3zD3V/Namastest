import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, Platform, ModalController } from '@ionic/angular';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { PROJECT_LIST } from 'src/app/shared/constants/NamedRoutes';


@Component({
  selector: 'app-project-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {

  @Input() project: Project;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public projectService: ProjectService,
    public router: Router,
    public modalCtrl: ModalController,
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public dataService: DataService,
  ) { }

  ngOnInit() {
  }

  public deleteProject() {
    this.projectService.deleteProjectById(this.project).subscribe(
      data => {
        console.log(data);
        this.showSuccessNotification();
        this.notifyAboutDeleteChange();
        this.router.navigate([PROJECT_LIST]);
      },
      err => {
        console.log(err);
        this.showFailureNotification();
      });
      this.modalCtrl.dismiss();
  }
  notifyAboutDeleteChange() {
    this.dataService.notifyAboutProjectChange();
  }

  private async showSuccessNotification() {

    if (this.platform.is('android')) {
      const toast = await this.toastCtrl.create({
        header: `${this.project.name} a été correctement supprimé!`,
        message: '',
        duration: 3000
      });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `${this.project.name} a été correctement supprimé!`,
        message: '',
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

  public dismissModal() {
    this.modalCtrl.dismiss();
  }
}
