import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Metricas';

  constructor (private httpService: HttpClient){}

  arrSolicitantes: string[];

  ngOnInit (){
    this.httpService.get('/assets/data/solicitantes.json').subscribe(
      data => {
        this.arrSolicitantes = data as string [];
      },
      (err: HttpErrorResponse) => {
      }
    )
  }

}
