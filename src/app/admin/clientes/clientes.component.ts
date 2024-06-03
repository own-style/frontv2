import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Administrador } from '../../../interfaces/administrador';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule,
            MatIconModule,
            MatTableModule,
            ReactiveFormsModule,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {


  displayedColumns: string[] = ['nombre', 'apellido', 'email','acciones'];

  dataSource = new MatTableDataSource<Administrador>();
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;
  
  
  constructor(){

  }
editar() {
throw new Error('Method not implemented.');
}
eliminar() {
throw new Error('Method not implemented.');
}
crear() {
throw new Error('Method not implemented.');
}

}
