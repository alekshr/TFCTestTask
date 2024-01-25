import {Application} from "./Application";

export class Request {

  Id: number;
  Title: string;
  Descriptions: string;
  Email: string;
  DateTimeDeadline: Date;
  ApplicationId: number;
  Application: Application | null;



  constructor() {
    this.Id = 1;
    this.Title = "";
    this.Descriptions = "";
    this.Email = "";
    this.DateTimeDeadline = new Date();
    this.ApplicationId = -1;
    this.Application = null;
  }

}
