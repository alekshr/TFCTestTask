import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Application} from '../models/Application';
import {Request} from "../models/Request";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})

export class RequestsCreateComponent {

  private _isSelectedDate: boolean = false;

  get isSelectedDate(): boolean {
    return this._isSelectedDate;
  }

  public readonly applications: Array<Application>;
  private request: Request;
  private readonly http: HttpClient;
  private readonly url: string;
  private readonly headers: HttpHeaders;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.request = new Request();
    this.http = http;
    this.url = baseUrl + 'request';
    this.applications = new Array<Application>();
    this.http.get<Application[]>(baseUrl + 'application' + '/allapplications').subscribe(result => {
      for (const application of result) {
        this.applications.push(application);
      }
    }, error => console.error(error));
  }


  public addRequest() {
    if(this.request.application === undefined || this.request.application === null){
      alert("Выберите приложение из списка");
      return;
    }
    const body = JSON.stringify(this.request);
    this.http.post<Request>(this.url, body, { headers: this.headers})
      .subscribe(result => {
        alert(`Создана заявка`);
      }, error => alert(`Ошибка при создании заявки ${JSON.stringify(error)}`));
  }

  public onChangeEmail(event: any) {
    this.request.email = event.target.value;
  }

  public onChangeTitle(event: any) {
    this.request.title = event.target.value;
  }

  public onChangeDescription(event: any) {
    this.request.descriptions = event.target.value;
  }

  public onChangeDateDeadline(event: any) {
    if (event.target.value !== undefined) {
      this.request.dateTimeDeadline = event.target.value;
      this._isSelectedDate = true;
    } else {
      this._isSelectedDate = false;
    }
  }

  public onChangeApplication(event: any) {
    let apps = this.applications.find(app => app.name == event.target.value)
    let app = apps as Application | null;
    this.request.application = app;
    this.request.applicationId = app?.id as number;
  }

}


