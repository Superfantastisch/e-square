import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'e-square-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'test-one';
  constructor (private http: HttpClient) {}

  ngOnInit(): void {
      console.log('on init');
      this.http.get<any>('asdffwfwaögö').subscribe(data => console.log(data));
      this.http.get<any>('asdffwfwaögö').subscribe(data => console.log(data));
      this.http.get<any>('asdffwfwaögö').subscribe(data => console.log(data));
      this.http.get<any>('asdffwfwaögö').subscribe(data => console.log(data));
      this.http.get<any>('asdffwfwaögö').subscribe(data => console.log(data));
      setTimeout(() => {
        this.http.get<any>('asdffwfwaögö').subscribe(data => console.log(data));
        this.http.get<any>('asdffwfwaögö').subscribe(data => console.log(data));
      }, 6000);

  }

}
