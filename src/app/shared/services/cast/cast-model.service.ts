import { Injectable } from '@angular/core';
import { Campaign } from 'src/app/models/campaign';
import { CampaignState } from 'src/app/models/campaign-state';
import { Catalog } from 'src/app/models/catalog';
import { Project } from 'src/app/models/project';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { CampaignTest } from 'src/app/models/campaign-test'
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class CastModelService {

  constructor() { }

  jsonToTest(jsonTest: Test): Test {
    jsonTest = Object.setPrototypeOf(jsonTest, Test.prototype);
    if (jsonTest.author != undefined) {
      jsonTest.author = Object.setPrototypeOf(jsonTest.author, User.prototype);
    }
    if (jsonTest.catalogs != undefined) {
      jsonTest.catalogs.map(catalog => {
        return Object.setPrototypeOf(catalog, Catalog.prototype);
      });
    }
    return jsonTest;
  }

  jsonToUser(jsonUser: User): User {
    jsonUser = Object.setPrototypeOf(jsonUser, User.prototype);
    if (jsonUser.tests != undefined) {
      jsonUser.tests.map(test => {
        return Object.setPrototypeOf(test, Test.prototype);
      });
    }
    if (jsonUser.projects != undefined) {
      jsonUser.projects.map(project => {
        return Object.setPrototypeOf(project, Project.prototype);
      });
    }
    if (jsonUser.projectsContributed != undefined) {
      jsonUser.projectsContributed.map(projectContributed => {
        return Object.setPrototypeOf(projectContributed, Project.prototype);
      });
    }
    if (jsonUser.catalogs != undefined) {
      jsonUser.catalogs.map(catalog => {
        return Object.setPrototypeOf(catalog, Catalog.prototype);
      });
    }
    if (jsonUser.campaigns != undefined) {
      jsonUser.campaigns.map(campaign => {
        return Object.setPrototypeOf(campaign, Campaign.prototype);
      });
    }
    return jsonUser;
  }

  jsonToCatalog(jsonCatalog: Catalog): Catalog {
    jsonCatalog = Object.setPrototypeOf(jsonCatalog, Catalog.prototype);
    if (jsonCatalog.author != undefined) {
      jsonCatalog.author = Object.setPrototypeOf(jsonCatalog.author, User.prototype);
    }
    if (jsonCatalog.tests != undefined) {
      jsonCatalog.tests.map(test => {
        return Object.setPrototypeOf(test, Test.prototype);
      });
    }
    return jsonCatalog;
  }

  jsonToProject(jsonProject: Project): Project {
    jsonProject = Object.setPrototypeOf(jsonProject, Project.prototype);
    if (jsonProject.author != undefined) {
      jsonProject.author = Object.setPrototypeOf(jsonProject.author, User.prototype);
    }
    if (jsonProject.contributors != undefined) {
      jsonProject.contributors.map(contributor => {
        return Object.setPrototypeOf(contributor, User.prototype);
      });
    }
    if (jsonProject.campaigns != undefined) {
      jsonProject.campaigns.map(campaign => {
        return Object.setPrototypeOf(campaign, Campaign.prototype);
      });
    }
    return jsonProject;
  }

  jsonToCampaign(jsonCampaign: Campaign): Campaign {
    jsonCampaign = Object.setPrototypeOf(jsonCampaign, Campaign.prototype);
    if (jsonCampaign.project != undefined) {
      jsonCampaign.project = Object.setPrototypeOf(jsonCampaign.project, Project.prototype);
    }
    if (jsonCampaign.state != undefined) {
      jsonCampaign.state = Object.setPrototypeOf(jsonCampaign.state, CampaignState.prototype);
    }
    if (jsonCampaign.tester != undefined) {
      jsonCampaign.tester = Object.setPrototypeOf(jsonCampaign.tester, User.prototype);
    }
    if (jsonCampaign.tests != undefined) {
      jsonCampaign.tests.map(test => {
        return Object.setPrototypeOf(test, Test.prototype);
      });
    }
    if (jsonCampaign.contributors != undefined) {
      jsonCampaign.contributors.map(contributor => {
        return Object.setPrototypeOf(contributor, User.prototype);
      });
    }
    return jsonCampaign;
  }

  jsonToCampaignState(jsonCampaignState: CampaignState): CampaignState {
    return Object.setPrototypeOf(jsonCampaignState, CampaignState.prototype);
  }

  jsonToCampaignTest(jsonCampaignTest: CampaignTest): CampaignTest {
    jsonCampaignTest = Object.setPrototypeOf(jsonCampaignTest, CampaignTest.prototype);
    if (jsonCampaignTest.test != undefined) {
      jsonCampaignTest.test = Object.setPrototypeOf(jsonCampaignTest.test, Test.prototype);
    }
    if (jsonCampaignTest.campaign != undefined) {
      jsonCampaignTest.campaign = Object.setPrototypeOf(jsonCampaignTest.campaign, Campaign.prototype);
    }
    return jsonCampaignTest
  }

  jsonToCredentials(jsonCredentials: Credential): Credential {
    return Object.setPrototypeOf(jsonCredentials, Credential.prototype);
  }

  jsonToRole(jsonRole: Role): Role {
    return Object.setPrototypeOf(jsonRole, Role.prototype);
  }

}
