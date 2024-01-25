import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Request} from '../models/Request';
import {ActivatedRoute, Router} from "@angular/router";
import {Application} from "../models/Application";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})

export class RequestsComponent implements OnInit {


  public countPages: number;
  public currentPage: number;
  public requests: { [index: number]: Request };
  public readonly toDay: Date;
  public readonly http: HttpClient;
  public readonly baseUrl: string;
  private readonly headers: HttpHeaders;

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http = http;
    this.baseUrl = baseUrl;
    this.requests = {};
    this.countPages = 0;
    this.currentPage = 1;
    this.toDay = new Date();
    http.get<number>(baseUrl + 'request' + '/count-requests').subscribe(result => {
      this.countPages = result;
    }, error => console.error(error));
  }

  public ngOnInit(): void {
    this.currentPage = Number(this.activatedRoute.snapshot.paramMap.get("page"));
    this.getRequests(this.currentPage);
  }

  public changeRequest(id: number) {
    let body = JSON.stringify(this.requests[id]);
    this.http.put<Request>(this.baseUrl + 'request', body, {headers: this.headers}).subscribe(result => {
      alert(`Изменена заявка ${result}`);
    }, error =>  alert(`Ошибка при изменении заявки ${error}`));
  }

  public onChangeTitle(event: any, id: number) {
    let request: Request = this.requests[id] as Request;
    request.title = event.target.value;
  }

  public onChangeDescriptions(event: any, id: number) {
    let request: Request = this.requests[id] as Request;
    request.descriptions = event.target.value;
  }

  public onChangeEmail(event: any, id: number) {
    let request: Request = this.requests[id] as Request;
    request.email = event.target.value;
  }

  public prevPage() {
    this.currentPage -= 1;
    this.router.navigate(['/requests', this.currentPage])
    this.requests = {};
    this.getRequests(this.currentPage);

  }

  public nextPage() {
    this.currentPage += 1;
    this.router.navigate(['/requests', this.currentPage])
    this.requests = {};
    this.getRequests(this.currentPage);
  }

  private getRequests(page: number) {
    this.http.get<Request[]>(this.baseUrl + 'request' + `/requests/${page}`).subscribe(result => {
      for (const request of result) {
        this.requests[request.id] = request;
      }
      alert(`Заявки страница ${page} загружена`);
    }, error =>  alert(`Страница не загружена: ${error}`));
  }
}



