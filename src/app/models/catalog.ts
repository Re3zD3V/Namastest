import { Test } from './test';
import { User } from './user';

export class Catalog {
  public id: number;
  public title: string;
  public description: string;
  public author: User;
  public tests: Array<Test>;
}
