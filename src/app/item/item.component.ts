import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: any[] = [];
  currentItem: any = {};
  nameFieldInvalid: boolean = false;
  

  constructor(private itemService: ItemService, private snackBar: MatSnackBar) { }

  

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe((items) => {
        this.items = items;
      });
  }

  getItemById(id: string): void {
    this.itemService.getItemById(id)
      .subscribe((item) => {
        this.currentItem = item;
      });
  }

  createItem(item: any): void {

    this.itemService.createItem(item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        this.showSnackbar('Elemento creado exitosamente');
      });

  }

  updateItem(id: string, item: any): void {
    this.itemService.updateItem(id, item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        this.showSnackbar('Elemento actualizado exitosamente');
      });

  }

  deleteItem(id: string): void {
    this.itemService.deleteItem(id)
      .subscribe(() => {
        this.getItems();
        this.showSnackbar('Elemento eliminado exitosamente');
      });
  }

  editItem(id: string): void {
    this.getItemById(id);
  }

  confirmDeleteItem(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      this.deleteItem(id);
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duración en milisegundos
    });
  }
}
