import { Campaign } from "./campaign";
import { Test } from "./test";

export class CampaignTest {
    public id: number;
    public test: Test;
    public testPosition: number;
    public isDone: boolean;
    public isSuccessful: boolean;
    public resultDetails: string;
    public subTitle: string;
    public details: string;
    public campaign: Campaign;
}
