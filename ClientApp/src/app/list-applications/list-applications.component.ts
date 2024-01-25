import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Application} from '../models/Application';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.css']
})

export class ApplicationListComponent implements OnInit {

  public countPages: number;
  public currentPage: number;
  public applications: Array<Application>;

  private readonly http: HttpClient;
  private readonly baseUrl: string;

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.countPages = 0;
    this.currentPage = 1;
    this.applications = new Array<Application>();

    http.get<number>(baseUrl + 'application' + '/count-applications').subscribe(result => {
      this.countPages = result;
    }, error => console.error(error));

  }

  public ngOnInit(): void {
    this.currentPage = Number(this.activatedRoute.snapshot.paramMap.get("page"));
    this.getApplications(this.currentPage);
  }

  public prevPage() {
    this.currentPage -= 1;
    this.router.navigate(['/applications', this.currentPage])
    this.applications = new Array<Application>();
    this.getApplications(this.currentPage);

  }

  public nextPage() {
    this.currentPage += 1;
    this.router.navigate(['/applications', this.currentPage])
    this.applications = new Array<Application>();
    this.getApplications(this.currentPage);
  }

  private getApplications(page: number) {
    this.http.get<Application[]>(this.baseUrl + 'application' + `/applications/${page}`).subscribe(result => {
      for (const application of result) {
        this.applications.push(application);
      }
      alert(`Приложения страница ${page} загружена`);
    }, error =>  alert(`Страница не загружена : ${error}`));
  }
}



