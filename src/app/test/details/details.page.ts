import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { TEST_LIST } from 'src/app/shared/constants/NamedRoutes';
import { CastModelService } from 'src/app/shared/services/cast/cast-model.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  test: Test;
  id: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public testService: TestService,
    public castService: CastModelService) {
    this.test = new Test();
    }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.testService.getTest(this.id).subscribe(response => {
      console.log(response);
      this.test = this.castService.jsonToTest(response);
    });
  }

  update(){
    this.testService.updateTest(this.id, this.test).subscribe(response => {
      console.log(response);
      this.router.navigate([TEST_LIST]);
    });
  }

  deleteTest(){
    this.testService.deleteTest(this.id).subscribe(response => {
      console.log(response);
      this.router.navigate([TEST_LIST]);
      //TODO: Afficher erreur si test dans campagne
    });
  }

}
