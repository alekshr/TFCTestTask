import {Component, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/Application';


@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.css']
})

export class ApplicationListComponent {

  readonly applications: Array<Application>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.applications = new Array<Application>();
    http.get<Application[]>(baseUrl + 'application').subscribe(result => {
      for (const application of result) {
        this.applications.push(application);
      }
    }, error => console.error(error));
  }
}



