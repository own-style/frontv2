import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';
import { CuentasService } from '../../../services/cuentas.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,
            RouterLink,
            HeaderComponent,
            SliderComponent,
          FooterComponent],

  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{

  registerForm! : FormGroup;
  
  constructor(
    private form:FormBuilder,
    private cuentaService: CuentasService,
  ){

  }
  ngOnInit(): void {
    this.registerForm = this.form.group({
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

  onSubmit(): void {
  if (this.registerForm.valid) {
    const userObj = {
      nombre: this.registerForm.value.firstName,
      apellido: this.registerForm.value.lastName,
      dni: this.registerForm.value.dni,
      telefono: this.registerForm.value.telefono,
      direccion: this.registerForm.value.direccion,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.cuentaService.registro(userObj).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
          timer: 1500,
          text: '¡Cuenta creada con éxito!'
        });
        this.registerForm.reset();
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
