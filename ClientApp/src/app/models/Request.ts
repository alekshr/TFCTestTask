import {Application} from "./Application";

export class Request {
  id: number;
  title: string;
  descriptions: string;
  email: string;
  dateTimeDeadline: Date;
  applicationId: number;
  application: Application | null;



  constructor() {
    this.id = 1;
    this.title = "";
    this.descriptions = "";
    this.email = "";
    this.dateTimeDeadline = new Date();
    this.applicationId = -1;
    this.application = null;
  }

}
