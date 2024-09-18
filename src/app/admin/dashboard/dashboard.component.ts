import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
//Angular material
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button'
import { BreakpointObserver } from '@angular/cdk/layout'
import { RouterLink } from '@angular/router';
import { AdministradoresComponent } from '../administradores/administradores.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { ProductosComponent } from '../productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { CuentasService } from '../../../services/cuentas.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule,
            MatIconModule,
            MatSidenavModule,
            MatListModule,
            MatButtonModule,
            MatDividerModule,
            RouterLink,
            CommonModule,
            AdministradoresComponent,
            ClientesComponent,
            ProductosComponent,                                                
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  
  @ViewChild(MatSidenav, {static: true})
  sidenav!:MatSidenav;
  selectedOption: string = '';
  
  
  constructor(
    private observer : BreakpointObserver,
    private cuentaService:CuentasService,
  ){
    
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
}
cerrarSesion():void {

  this.cuentaService.cerrarSesion();
}

ngOnInit(): void {
  this.observer.observe(["(max-width: 800px)"])
  .subscribe((res)=>{
    if(res.matches)
      {
        this.sidenav.mode="over";
        this.sidenav.close();
      }else{
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    })
  }
}
