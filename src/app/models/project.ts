import { IonDatetime } from '@ionic/angular';
import { Campaign } from './campaign';
import { User } from './user';

export class Project {
    public id: number;
    public name: string;
    public createdAt: IonDatetime;
    public author: User;
    public contributors: Array<User>;
    public campaigns: Array<Campaign>;
    public description: string;
}
