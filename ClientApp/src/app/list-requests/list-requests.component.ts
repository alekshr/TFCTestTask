import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Request} from '../models/Request';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})

export class RequestsComponent {

  readonly requests: {[index:number]: Request};
  readonly http: HttpClient;
  readonly baseUrl: string;
  private readonly headers: HttpHeaders;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http = http;
    this.baseUrl = baseUrl;
    this.requests = {};
    http.get<Request[]>(baseUrl + 'request').subscribe(result => {
      for (const request of result) {
        this.requests[request.id] = request;
      }
    }, error => console.error(error));
  }

  public changeRequest(id: number) {
    let body = JSON.stringify(this.requests[id]);
    return this.http.put<Request>(this.baseUrl + 'request', body, {headers: this.headers}).subscribe(result => {
      console.error(result)
    }, error => console.error(error));
  }

  public onChangeTitle(event: any, id: number){
    let request: Request = this.requests[id] as Request;
    request.title = event.target.value;
  }

  public onChangeDescriptions(event: any, id: number){
    let request: Request = this.requests[id] as Request;
    request.descriptions = event.target.value;
  }

  public onChangeDateDeadline(event: any, id: number) {
    if (event.target.value === undefined) {
      let request: Request = this.requests[id] as Request;
      request.dateTimeDeadline = event.target.value;
      // this._isSelectedDate = true;
    } else {
      // this._isSelectedDate = false;
    }
  }
  public onChangeEmail(event: any, id: number){
    let request: Request = this.requests[id] as Request;
    request.email = event.target.value;
  }

}



