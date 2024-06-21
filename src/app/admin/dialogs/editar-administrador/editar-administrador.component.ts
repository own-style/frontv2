import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AdministradorService } from '../../../../services/administrador.service';
import { Administrador } from '../../../../interfaces/administrador';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-administrador',
  standalone: true,
  imports: [ReactiveFormsModule,
            MatDialogModule
  ],
  templateUrl: './editar-administrador.component.html',
  styleUrl: './editar-administrador.component.scss'
})
export class EditarAdministradorComponent implements OnInit {
  
  editarAdministrador! : FormGroup
  readonly dialog = inject(MatDialog)
  constructor(private form:FormBuilder,
    private sadministradores: AdministradorService,
    private mat: MatDialogRef<EditarAdministradorComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
  }
  ngOnInit(): void {
    this.editarAdministrador = this.form.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      email:['',Validators.required],
      password: ['',Validators.required],
    })
    this.sadministradores.getAdministradorById(this.data.id).subscribe(administrador =>{
      this.editarAdministrador.patchValue({
        nombre: administrador.nombre,
        apellido: administrador.apellido,
        email: administrador.email,
        password: administrador.password,
      })
    })
  }
  cancelar() {
  this.mat.close();
  }
  editarAdministradores():void {
    if(this.editarAdministrador.valid){
      const formValue = this.editarAdministrador.value;
      const administradorModificado: Administrador = {
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        email: formValue.email,
        password: formValue.password,
      };
      this.sadministradores.editar(this.data.id!,administradorModificado).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modificación Exitosa',
            showConfirmButton: false,
            timer: 3000
          });
          this.mat.close(true);
        },
        error: () => {
          Swal.fire(
            'Error',
            'No se pudo editar el administrador.',
            'error'
          );
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
}
