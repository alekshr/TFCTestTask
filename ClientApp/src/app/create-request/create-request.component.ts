import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Application} from '../models/Application';
import {Request} from "../models/Request";
import {NgForm} from "@angular/forms";
import {catchError} from "rxjs";

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
    this.http.get<Application[]>(baseUrl + 'application').subscribe(result => {
      for (const application of result) {
        this.applications.push(application);
      }
    }, error => console.error(error));
  }


  public addProduct() {
    const body = JSON.stringify(this.request);
    console.log(body);
    return this.http.post<Request>(this.url, body, { headers: this.headers})
      .subscribe(result => {
        console.error(result);
      }, error => console.error(error));
  }

  public onChangeEmail(event: any) {
    this.request.Email = event.target.value;
  }

  public onChangeTitle(event: any) {
    this.request.Title = event.target.value;
  }

  public onChangeDescription(event: any) {
    this.request.Descriptions = event.target.value;
  }

  public onChangeDateDeadline(event: any) {
    if (event.target.value === undefined) {
      this.request.DateTimeDeadline = event.target.value;
      this._isSelectedDate = true;
      console.log(`date = ${this.request.DateTimeDeadline}`)
    } else {
      this._isSelectedDate = false;
    }
  }

  public onChangeApplication(event: any) {
    let apps = this.applications.find(app => app.name == event.target.value)
    let app = apps as Application | null;
    this.request.Application = app;
    this.request.ApplicationId = app?.id as number;
  }

}

