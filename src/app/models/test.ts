import { Catalog } from "./catalog";
import { User } from "./user";

export class Test {
    public id: number;
    public title: string;
    public description: string;
    public author: User;
    public catalogs: Array<Catalog>;
}
