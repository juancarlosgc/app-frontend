import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { ItemService } from '../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  items: Item[];
  paginador: any; 

  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.itemService.getItems(page)
     .pipe(
        tap(response => {
          (response.content as Item[]).forEach(item => console.log(item.descripcionItem));
        })
        ).subscribe(response => {
         this.items = response.content as Item[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteItem(item: Item): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${item.nombreItem} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.itemService.deleteItem(item.idItem).subscribe(
          response => {
            this.items = this.items.filter(per => per !== item)
            swal(
              'Ítem Eliminado!',
              `Ítem ${item.nombreItem} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
