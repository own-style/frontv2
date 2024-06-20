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
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      dni: ['',Validators.required],
      telefono: ['',Validators.required],
      direccion:['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required]          
    })
    this.scliente.getClienteById(this.data.id).subscribe(cliente =>{
      this.editarCliente.patchValue({
        firstName: cliente.firstName,
        lastName: cliente.lastName,
        dni: cliente.dni,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        email: cliente.email,
        username: cliente.username,
        password: cliente.password,
      });
    });    
  }
  cancelar() {
  this.mat.close();
  }

  editar(): void {
    if (this.editarCliente.valid) {
      const formData = new FormData();
      formData.append('nombre', this.editarCliente.get('nombre')!.value);
      formData.append('descripcion', this.editarCliente.get('descripcion')!.value);
      formData.append('precio', this.editarCliente.get('precio')!.value);
     
      this.scliente.updateCliente(this.data.id, formData).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Producto editado',
            timer: 1500,
            text: '¡Producto editado con éxito!'
          });
          this.mat.close(true);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message
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

}
