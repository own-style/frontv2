import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AdministradorService } from '../../../services/administrador.service';
import { Administrador } from '../../../interfaces/administrador';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrearAdministradoresComponent } from '../dialogs/crear-administradores/crear-administradores.component';
import { EditarAdministradorComponent } from '../dialogs/editar-administrador/editar-administrador.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administradores',
  standalone: true,
  imports: [  
            MatTableModule,
            MatIconModule, 
            ReactiveFormsModule,                                
          ],
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.scss'
})

export class AdministradoresComponent implements OnInit{
  
  displayedColumns: string[] = ['nombre', 'apellido', 'email','acciones'];

  dataSource = new MatTableDataSource<Administrador>();
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;
  
  
  constructor(    
    private administradorService: AdministradorService,
    private dialog : MatDialog)
    {      
      this.dataSource = new MatTableDataSource();      
    }
    
    ngOnInit():void  {
      this.get();
    }
    
    ngAfterViewInit(): void {      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
    }
    
    get():void{
      this.administradorService.getAdministradores().subscribe({
        next:(res)=>{
          this.dataSource.data=res;          
        }
      })                
    }    

    openCrearDialog():void{
      const dialogRef = this.dialog.open(CrearAdministradoresComponent);
      dialogRef.componentInstance.administradorCreado.subscribe(() => {
        this.get();
      })
    }
          
    editarAdministrador(id: number): void {
      const dialogRef = this.dialog.open(EditarAdministradorComponent,{
        data: { id: id }
      });  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.get(); 
        }
      })
    }       
    eliminarAdministrador(id: number): void {
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
          this.administradorService.eliminar(id).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Administrador eliminado',
                timer: 1500,
                text: 'Administrador eliminado con éxito!'
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



}
