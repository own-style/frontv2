import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductosService } from '../../../services/productos.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from '../../../interfaces/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  
  displayedColumns: string[] = ['nombre','precio','descripcion','imagen','acciones'];
  
  dataSource = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;


  productos: Producto[] = [];
  
  constructor(private readonly productoService: ProductosService) 
  {    
    this.dataSource = new MatTableDataSource();
  }
  
  
  ngOnInit(): void {
    this.get();
  }
  ngAfterViewInit(): void {      
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  get():void{
    this.productoService.getProductos().subscribe({
      next:(res)=>{
        this.dataSource.data=res;
      }
    })    
  }
  crear() {
  throw new Error('Method not implemented.');
  }
  eliminar() {
  throw new Error('Method not implemented.');
  }
  editar() {
  throw new Error('Method not implemented.');
  }
  mostrar(){
    throw new Error('Method not implemented.');
  }


}
