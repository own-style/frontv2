import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,
    ProductListComponent,
            MatIconModule,
            RouterLink,
            
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
