import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../../services/cliente.service';
import { cliente } from '../../../../interfaces/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [MatDialogModule,
            ReactiveFormsModule],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.scss'
})
export class EditarClientesComponent implements OnInit{

  editarCliente! : FormGroup;
  readonly dialog = inject(MatDialog)
  constructor(private form:FormBuilder,
              private scliente: ClienteService,
              private mat:MatDialogRef<EditarClientesComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any
  ){
  }
  
  ngOnInit(): void {
    this.editarCliente = this.form.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      dni: ['',Validators.required],
      telefono: ['',Validators.required],
      direccion:['',Validators.required],
      email: ['',Validators.required],      
      password: ['',Validators.required]          
    })
    this.scliente.getClienteById(this.data.id).subscribe(cliente =>{
      this.editarCliente.patchValue({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        dni: cliente.dni,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        email: cliente.email,        
        password: cliente.password,
      });
    });    
  }
  cancelar() {
  this.mat.close();
  }
  
  editarClientes(): void {
    if (this.editarCliente.valid) {
      const formValue = this.editarCliente.value;
      const clienteModificado: cliente = {
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        dni: formValue.dni,
        direccion: formValue.direccion,
        email: formValue.email,
        telefono: formValue.telefono,
        password: formValue.password,
      };
  
      this.scliente.updateCliente(this.data.id!, clienteModificado).subscribe({
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
            'No se pudo editar el cliente.',
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
