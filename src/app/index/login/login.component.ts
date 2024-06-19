import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CuentasService } from '../../../services/cuentas.service';
import { HeaderComponent } from '../header/header.component';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
            RouterLink,
            HeaderComponent
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
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.cuentasService.login(email,password).subscribe({
      next:(res)=>{
        if(res.esAdmin === true){
          this.router.navigate(['admin']);
        }
        else{
          this.router.navigate(['']);
        }
      },            
    })

  }

  // OnLogin() {
  //   if(this.loginForm.valid){
    
  //     const loginObj = {

  //       email: this.loginForm.value.email,
  //       password: this.loginForm.value.password
  //     };

  //     this.cuentasService.login(loginObj).subscribe({
  //       next: (res) => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: res.message,
  //           timer: 1500
  //         });
  //         this.loginForm.reset();
  //         this.cuentasService.storeToken(res.token);
  //         if (this.cuentasService.login(loginObj)){
  //           (sessionStorage.setItem("isLoggedIn", "true"))
  //         }else{
  //           sessionStorage.setItem("isLoggedIn", "false")
  //         }
                    
  //       },
  //       error: (err) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: err.error.message // Mostrar el mensaje de error devuelto por el servidor
  //         });
  //       }
  //     });
  
  //   } else {  
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Por favor complete todos los campos correctamente'
      
  //     })

  //   }
    
  // }


}
