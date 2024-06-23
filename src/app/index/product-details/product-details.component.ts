// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-product-details',
  standalone:true,
  imports:[CommonModule,
           HeaderComponent,
           FooterComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productos: any;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const idNumber = +productId; // Convertir a número
      this.productosService.getProductoById(idNumber).subscribe((data) => {
        this.productos = data;
      }, error => {
        console.error('Error fetching product details:', error);        
      });
    } else {
      console.error('No product ID found in the route');      
    }
  }

}
