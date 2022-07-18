import { Campaign } from "./campaign";
import { Catalog } from "./catalog";
import { Project } from "./project";
import { Test } from "./test";

export class User {
    public id: number;
    public email: string;
    public password: string;
    public lastname: string;
    public firstname: string;
    public tests?: Array<Test>;
    public projects?: Array<Project>;
    public projectsContributed?: Array<Project>;
    public catalogs?: Array<Catalog>;
    public campaigns?: Array<Campaign>;
}
