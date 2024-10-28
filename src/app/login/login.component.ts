import { Component } from '@angular/core';
import { Avis, Commandes } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) { }
  avis?: Avis[];
  ngOnInit(): void {
    this.http.get<Avis[]>('http://localhost:4332/api/public/avis')
      .subscribe(
        (response: Avis[]) => {
          console.log(response);
        },
        (error: any) => {
          console.error('Error fetching avis:', error);
        }
      );
  }
}