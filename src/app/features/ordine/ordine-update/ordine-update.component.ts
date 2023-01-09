import { ActivatedRoute, Router } from '@angular/router';
import { OrdineService } from './../ordine.service';
import { PizzaService } from './../../pizza/pizza.service';
import { ClienteService } from './../../cliente/cliente.service';
import { Utente } from 'src/app/model/utente';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from './../../../model/ordine';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/model/pizza';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ordine-update',
  templateUrl: './ordine-update.component.html',
  styleUrls: ['./ordine-update.component.css']
})
export class OrdineUpdateComponent implements OnInit{

  ordine:Ordine={}
  errorMessage:string=''
  fattorinoId?: number;
  pizzaId?: number;
  clienteId?:number;
  pizzaIds?:number[]=[];
  clienti: Cliente[] = [];
  fattorini:Utente[]=[]
  pizze:Pizza[]=[]
  dataString?:string

  constructor(private clienteService:ClienteService,
    private pizzaService:PizzaService,
    private ordineService:OrdineService,
    private route:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.clienteService.getClienti().subscribe(clienteListItem => this.clienti = clienteListItem);
    this.pizzaService.getPizze().subscribe(pizzaListItem =>this.pizze=pizzaListItem)
    this.ordineService.findAllFattorini().subscribe(result => this.fattorini=result)
    let idOrdine=Number(this.route.snapshot.paramMap.get('id'));
    this.ordineService.getOrdine(idOrdine).subscribe((ordineItem : Ordine) => {
      this.ordine = ordineItem;
      this.fattorinoId = ordineItem.fattorino?.id;
      this.clienteId=ordineItem.cliente?.id;
      // if (this.ordine.pizze) {
        for (let pizza of ordineItem.pizze!) {
          this.pizzaIds!.push(pizza.id!);
        }
        // this.pizzaId= this.pizze.find(pizza => pizza.id === this.ordine.pizze)?.id;
      // }
      this.dataString=this.ordine!.data?.toISOString().split('T')[0]
      // var date:Date=new Date(this.ordine!.data?[2]:this.ordine!.data?[1]:this.ordine!.data?[0])
      // this.dataString=this.ordine.data?.toDateString()
      // this.dataString = this.ordine.data?.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
      // this.convertMillisecondsToDateString(this.ordine.data)
      })  
  }

  updateOrdine(ordineForm:NgForm){
    if (ordineForm.valid){
       this.ordine.cliente=this.clienti.find(clienteItem => 
        this.clienteId==clienteItem.id)
        this.ordine.fattorino=this.fattorini.find(fattorinoItem => 
        this.fattorinoId==fattorinoItem.id)
        this.ordineService.updateOrdine(this.ordine).subscribe(
        ordineItem => {
          console.log('modificato ' + JSON.stringify(ordineItem));
          this.ordine = ordineItem;
          this.ordine.data=new Date(this.dataString!)
        },
        
        err => this.errorMessage = err,
        () => this.router.navigate([`/ordine/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
      );
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

  addPizza(idPizza:any){
    this.pizze.forEach(pizzaItem => {
      if (idPizza == pizzaItem.id) {
        this.ordine.pizze!.push(pizzaItem);
      }
    });
  }

  //  convertMillisecondsToDateString(milliseconds: number): string {
  //   const datePipe = new DatePipe('en-US');
  //   return datePipe.transform(milliseconds, 'dd/MM/yyyy')!;
  // }
  // convertMillisecondsToDateString(date:Date){
  //   return date.getFullYear() + '-' + ('0' + (
  //     date.getMonth() +1)).slice(-2) + '-' + ('0' +date.getDate()).slice(-2)
  // }


}
  
