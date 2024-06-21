import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../../services/cliente.service';
import Swal from 'sweetalert2';
import { CuentasService } from '../../../../services/cuentas.service';

@Component({
  selector: 'app-crear-clientes',
  standalone: true,
  imports: [MatDialogModule,
            ReactiveFormsModule

  ],
  templateUrl: './crear-clientes.component.html',
  styleUrl: './crear-clientes.component.scss'
})
export class CrearClientesComponent implements OnInit {
  @Output() clienteCreado = new EventEmitter<void>();  
  crearClienteForm! : FormGroup;
  readonly dialog = inject(MatDialog);
  
  constructor(private form: FormBuilder,
              private sclientes: ClienteService,
              private scuentas:CuentasService,
              private mat : MatDialogRef<CrearClientesComponent>
  )
  {    
  }

  ngOnInit(): void {
    this.crearClienteForm = this.form.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      dni: ['',Validators.required],
      telefono: ['',Validators.required],
      direccion:['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required]                  
    })
  }
  cancelar() {
    this.mat.close()
    }
  
  openDialog() {
    const dialogRef = this.dialog.open(CrearClientesComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  crear(): void {
    if (this.crearClienteForm.valid) {
      const userObj = {
        nombre: this.crearClienteForm.value.firstName,
        apellido: this.crearClienteForm.value.lastName,
        dni: this.crearClienteForm.value.dni,
        telefono: this.crearClienteForm.value.telefono,
        direccion: this.crearClienteForm.value.direccion,
        email: this.crearClienteForm.value.email,
        username: this.crearClienteForm.value.username,
        password: this.crearClienteForm.value.password
      };     
      this.scuentas.registro(userObj).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente creado',
            timer: 1500,
            text: '¡Cliente creado con éxito!'
          });
          this.crearClienteForm.reset();          
          this.clienteCreado.emit(); // Emit the event to inform that a product was created
          this.mat.close();
                    
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message // Mostrar el mensaje de error devuelto por el servidor
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
