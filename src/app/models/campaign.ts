import { Project } from "./project";
import { IonDatetime } from "@ionic/angular";
import { CampaignState } from "./campaign-state";
import { User } from "./user";
import { CampaignTest } from "./campaign-test";

export class Campaign {
    public id: number;
    public title: string;
    public details: string;
    public project: Project|string;
    public predictedStartDate: IonDatetime;
    public predictedEndDate: IonDatetime;
    public actualStartDate: IonDatetime;
    public actualEndDate: IonDatetime;
    public state: CampaignState|string;
    public comments: string;
    public tester: User|string;
    public tests: Array<CampaignTest>;
    public contributors: Array<User>;
}
