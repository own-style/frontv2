import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CuentasService } from '../../../services/cuentas.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
            RouterLink,
            HeaderComponent,
            FooterComponent
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
}
