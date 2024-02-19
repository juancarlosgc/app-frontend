import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { ItemService } from '../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Mantenimiento } from '../model/mantenimiento';

@Component({
  selector: 'app-formitem',
  templateUrl: './formitem.component.html',
  styleUrls: ['./formitem.component.css']
})
export class FormitemComponent implements OnInit{

  public item: Item = new Item();
  mantenimientos: Mantenimiento[] = [];
  private titulo: string = 'Formulario de items';
  private errores: string[];

  constructor(private itemService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarItem();
    //this.cargarMantenimientos();
    this.itemService.listMantenimientos().subscribe(mantenimientos => this.mantenimientos = mantenimientos);
  }

  public createItem(): void {
    this.itemService.createItem(this.item)
      .subscribe(response => {
        this.router.navigate(['/item'])
        swal('Nuevo Ítem', `Ítem creado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  cargarItem(): void {
    this.activatedRoute.params.subscribe(params => {
      let idVehiculo = params['idItem'];
      if (idVehiculo) {
        this.itemService.getItem(idVehiculo).subscribe((item) => this.item = item)
      }
    })
  }

  updateItem(): void{
    this.itemService.updateItem(this.item)
    .subscribe (response => {
      this.router.navigate(['/item'])
      swal('Actualizar Ítem', `Ítem actualizado con éxito!`, 'success')
       },
        err => {
          this.errores = err.error.errors as string[];
          //console.error('Código del error desde el backend: ' + err.status);

        }
    )
  }

  cargarMantenimientos(): void {
    this.itemService.listMantenimientos().subscribe(data => this.mantenimientos = data);
    console.log(this.mantenimientos);
  }


}
