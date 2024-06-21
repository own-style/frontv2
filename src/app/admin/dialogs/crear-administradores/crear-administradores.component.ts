import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AdministradorService } from '../../../../services/administrador.service';
import Swal from 'sweetalert2';
import { Administrador } from '../../../../interfaces/administrador';

@Component({
  selector: 'app-crear-administradores',
  standalone: true,
  imports: [ReactiveFormsModule,
            MatDialogModule            
  ],
  templateUrl: './crear-administradores.component.html',
  styleUrl: './crear-administradores.component.scss'
})
export class CrearAdministradoresComponent implements OnInit {

  @Output() administradorCreado = new EventEmitter<void>();
  crearAdministrador! : FormGroup;
  readonly dialog = inject(MatDialog);


constructor(private form : FormBuilder,
            private sadministradores: AdministradorService,
            private mat : MatDialogRef<CrearAdministradoresComponent>
)
{

}

  ngOnInit(): void {
    this.crearAdministrador = this.form.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    email:['',Validators.required],
    password: ['',Validators.required],
    })
  }
  crear(): void {
    if (this.crearAdministrador.valid) {
      const administrador: Administrador = this.crearAdministrador.value;
      this.sadministradores.crear(administrador).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Administrador creado',
            timer: 1500,
            text: '¡Administrador creado con éxito!'
          });
          this.crearAdministrador.reset();
          this.administradorCreado.emit();
          this.mat.close();
        },
        error: (err) => {
          console.error('Error creating admin:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message || 'Ocurrió un error al crear el administrador'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos correctamente'
      });
    }
  }    
  
  cancelar() {
    this.mat.close();
}

}

