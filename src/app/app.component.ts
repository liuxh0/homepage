import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  count = '';
  hearted = false;

  private readonly endpoint = 'https://uclk91azmj.execute-api.eu-central-1.amazonaws.com/Prod/likes';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    if (window.localStorage !== undefined) {
      this.hearted = window.localStorage.getItem('hearted') === 'true';
    }

    this.httpClient.get(this.endpoint).toPromise().then(value => {
      this.count = value.toString();
    });
  }

  onHeartClick(): void {
    if (this.hearted) { return; }

    this.hearted = true;
    this.count = (Number.parseInt(this.count, 10) + 1).toString();
    this.httpClient.post(this.endpoint, undefined).toPromise().then(() => {
      window.localStorage.setItem('hearted', 'true');
    });
  }
}
