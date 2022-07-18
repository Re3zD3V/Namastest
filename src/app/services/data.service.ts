import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  projectListNotifier: Subject<null> = new Subject<null>();
  testListNotifier: Subject<null> = new Subject<null>();
  catalogListNotifier: Subject<null> = new Subject<null>();
  campaignListNotifier: Subject<null> = new Subject<null>();

  constructor() { }

  notifyAboutProjectChange(){
    this.projectListNotifier.next();
  }

  notifyAboutTestChange() {
    this.testListNotifier.next();
  }

  notifyAboutCatalogChange() {
    this.catalogListNotifier.next();
  }

  notifyAboutCampaignChange() {
    this.campaignListNotifier.next();
  }
}
