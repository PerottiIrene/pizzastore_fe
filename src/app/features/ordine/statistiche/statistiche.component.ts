import { Statistiche } from './../../../model/statistiche';
import { OrdineService } from './../ordine.service';
import { NgForm } from '@angular/forms';
import { DateStats } from './../../../model/date-stats';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from './../../../model/cliente';
import { Component } from '@angular/core';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})
export class StatisticheComponent {

  date?:DateStats={
    dataInizio: new Date,
    dataFine:new Date
  }

  statistiche?:Statistiche

  constructor(private  http:HttpClient,
    private ordineService:OrdineService){}

  loadStatistiche(statForm:NgForm) {
    this.ordineService.getStatistiche(this.date!).subscribe(data => {
      this.statistiche = data;
    });
  }

  
}


