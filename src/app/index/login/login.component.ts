
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CuentasService } from '../../../services/cuentas.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
            RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(    
    private form: FormBuilder,    
    private cuentasService: CuentasService,
    private router:Router,
    

  ){

  }

  ngOnInit(): void {
    
    this.loginForm = this.form.group({
      email:['',Validators.required ],
      password:['',Validators.required ]
    })
    
  }

  OnLogin() {
    if(this.loginForm.valid){
    
      const loginObj = {

        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.cuentasService.signIn(loginObj).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
            timer: 1500
          });
          this.loginForm.reset();
          this.cuentasService.storeToken(res.token);

          if (res.userType === 'cliente') {
            this.router.navigate(['/home']);
          } else if (res.userType === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          }
          
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
      
      })

    }
    
  }


}
