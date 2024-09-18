import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './index/header/header.component';
import { FooterComponent } from './index/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './index/slider/slider.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    SliderComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ownstylefront';
}
