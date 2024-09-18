import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../../services/cliente.service';
import { cliente } from '../../../interfaces/cliente';
import { CrearClientesComponent } from '../dialogs/crear-clientes/crear-clientes.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarClientesComponent } from '../dialogs/editar-clientes/editar-clientes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule,
            MatIconModule,
            MatTableModule,
            ReactiveFormsModule,
            MatDialogModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit{
  displayedColumns: string[] = ['nombre', 'apellido','dni','telefono','direccion', 'email','acciones'];
  
  dataSource = new MatTableDataSource<cliente>();
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;
    
  constructor(
    private clientesService:ClienteService,
    private dialog : MatDialog
  ){
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
    this.clientesService.getClientes().subscribe({
      next:(res)=>{
        this.dataSource.data=res;
      }
    })    
  }

  openCrearDialog(): void {
    const dialogRef = this.dialog.open(CrearClientesComponent);
    dialogRef.componentInstance.clienteCreado.subscribe(() => {
      this.get();
    });
  }
  
  editarCliente(id: number): void {
    const dialogRef = this.dialog.open(EditarClientesComponent,{
      data: { id: id }
    });  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.get(); 
      }
    })
  }

  eliminarCliente(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'error',      
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.deleteClients(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Cliente eliminado',
              timer: 1500,
              text: 'Cliente eliminado con éxito!'
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
crear() {
throw new Error('Method not implemented.');
}

}
