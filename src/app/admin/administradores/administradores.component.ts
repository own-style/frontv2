import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AdministradorService } from '../../../services/administrador.service';
import { Administrador } from '../../../interfaces/administrador';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';

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
    private administradorService: AdministradorService){      
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
          
    editar() {    
    }    
    crear() {
    }
    eliminar() {
    }



}
