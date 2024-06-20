import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductosService } from '../../../services/productos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from '../../../interfaces/producto';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrearProductosComponent } from '../dialogs/crear-productos/crear-productos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
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
  
  constructor(private readonly productoService: ProductosService,
              private dialog : MatDialog,
  ) 
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

  openCrearDialog(): void {
    const dialogRef = this.dialog.open(CrearProductosComponent);
    dialogRef.componentInstance.productoCreado.subscribe(() => {
      this.get();
    });
  }

  get():void{
    this.productoService.getProductos().subscribe({
      next:(res)=>{
        this.dataSource.data=res;
      }
    })    
  }
 
  eliminarProducto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              timer: 1500,
              text: '¡Producto eliminado con éxito!'
            });
            this.get(); // Recargar lista de productos o actualizar vista
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error.message
            });
          }
        });
      }
    });
  }

  editar() {
  throw new Error('Method not implemented.');
  }

}
