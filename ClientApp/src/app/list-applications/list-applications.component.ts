import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Application} from '../models/Application';

@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.css']
})

export class ApplicationListComponent {

  public countPages: number;
  public currentPage: number;
  public applications: Array<Application>;

  private readonly http: HttpClient;
  private readonly baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.countPages = 0;
    this.currentPage = 1;
    this.applications = new Array<Application>();

    http.get<number>(baseUrl + 'application' + '/count-applications').subscribe(result => {
      this.countPages = result;
    }, error => console.error(error));

    this.getApplications(this.currentPage);
  }

  public changePage(event: number) {
    this.currentPage = event;
    this.applications = new Array<Application>();
    this.getApplications(this.currentPage);

  }

  private getApplications(page: number){
    this.http.get<Application[]>(this.baseUrl + 'application' + `/applications/${page}`).subscribe(result => {
      for (const application of result) {
        this.applications.push(application);
      }
    }, error => console.error(error));
  }
}



