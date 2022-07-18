import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { CatalogService } from 'src/app/services/catalog.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenDecoderService } from 'src/app/shared/services/token/token-decoder.service';
import { Catalog } from 'src/app/models/catalog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { CreatePageCatalog } from '../create/create.page';
import { ModalAnimations } from 'src/app/shared/libraries/modal-animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  catalogs: Array<Catalog>;
  currentPage = 1;
  isNewCatalogModalOpen = false;
  mobile: boolean;
  notifierSubscription: Subscription = this.dataService.catalogListNotifier.subscribe(notifier => {
    this.getAllCatalogs();
  })
  modalAnimations: ModalAnimations;

  // npm install ng2-search-filter
  searchCatalog: string;

  reorderCatalogs(event) {
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
    public catalogService: CatalogService,
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
    this.getAllCatalogs();
  }

  ionViewWillEnter() {
    this.getAllCatalogs();
  }

  async getAllCatalogs(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    //Chargement de l'utilisateur connecté et récupération de ses catalogues
    this.userService.getUser(this.tokenDecode.getId()).subscribe(response => {
        loading.dismiss();
        this.catalogs = response.catalogs;
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.getAllCatalogs(event);
  }

  delete(catalog: Catalog) {
    //Delete catalog in catalog data
    this.catalogService.deleteCatalog(catalog.id).subscribe((response) => {
      //Update list after delete is successful
      this.getAllCatalogs();
    });
  }

  ngOnDestroy() {
    this.modalCtrl.dismiss();
  }

  /**
   * OUVERTURE DU MODAL DE CREATION DE PROJET
   */
  public async openNewCatalogModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePageCatalog,
      cssClass: ['namastest-modal', 'namastest-center-modal'],
      enterAnimation: this.modalAnimations.enterAnimation,
      leaveAnimation: this.modalAnimations.leaveAnimation
    });
    await modal.present();
  }

  showConfirmAlert(catalog: Catalog) {
      this.alertCtrl.create({
        header: "!! Suppression !!",
        message: "Voulez-vous vraiment supprimer ce catalogue?",
        buttons: [
          {
            text: "Confirmer",
            handler: () => {
              this.delete(catalog);
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
