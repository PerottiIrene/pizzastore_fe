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

@Component({
  selector: 'app-ordine-update',
  templateUrl: './ordine-update.component.html',
  styleUrls: ['./ordine-update.component.css']
})
export class OrdineUpdateComponent implements OnInit{

  ordine:Ordine={}
  errorMessage:string=''
  fattorinoId?: number;
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
      console.log(ordineItem.data)
      this.fattorinoId = ordineItem.fattorino?.id;
      this.clienteId=ordineItem.cliente?.id;
      if (this.ordine.pizze) {
        for (let pizza of this.ordine.pizze) {
          this.pizzaIds!.push(pizza.id!);
        }
      }
      this.dataString=this.ordine!.data?.toISOString().split('T')[0]
      // this.dataString=this.ordine.data?.toDateString()
      // this.dataString = this.ordine.data?.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
      })  
  }

  updateOrdine(ordineForm:NgForm){
    if (ordineForm.valid){
       this.ordine.cliente=this.clienti.find(clienteItem => 
        this.clienteId==clienteItem.id)
        this.ordine.fattorino=this.fattorini.find(fattorinoItem => 
        this.fattorinoId==fattorinoItem.id)
        this.pizze.forEach(pizzaItem => {
            if (this.pizzaIds == pizzaItem.id) {
                 this.pizze.push(pizzaItem);
            }
          })
        this.ordine.pizze = this.pizze;
        this.ordineService.updateOrdine(this.ordine).subscribe(
        ordineItem => {
          console.log('modificato ' + JSON.stringify(ordineItem));
          this.ordine = ordineItem;
        },
        
        err => this.errorMessage = err,
        () => this.router.navigate([`/ordine/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
      );
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

}
  
