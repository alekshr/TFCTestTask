import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/Request';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})

export class RequestsComponent {

  readonly requests: Array<Request>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.requests = new Array<Request>();
    http.get<Request[]>(baseUrl + 'request').subscribe(result => {
      for (const request of result) {
        console.log(request);
        this.requests.push(request);
      }
    }, error => console.error(error));
  }
}



