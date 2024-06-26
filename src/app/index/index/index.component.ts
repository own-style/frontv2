import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SliderComponent } from '../slider/slider.component';
import { CarritoIndexComponent } from '../carrito-index/carrito-index.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,
    ProductListComponent,
            MatIconModule,
            RouterLink,
            HeaderComponent,
            FooterComponent,
            SliderComponent,
            CarritoIndexComponent,
            
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
