import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <app-slider></app-slider>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports:[HeaderComponent,
            SliderComponent,
            RouterModule,
            FooterComponent
  ]
})
export class AppLayoutComponent {}
