import { Component, OnInit } from '@angular/core';
import { MercadoPagoService } from '../../../services/mercadopago.service';
import { CartService } from '../../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

declare var MercadoPago: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  mp: any;
  publicKey = 'YOUR_PUBLIC_KEY';
  productos: any[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private mpService: MercadoPagoService
  ) {}

  ngOnInit() {
    this.mp = new MercadoPago(this.publicKey);
    this.productos = this.cartService.getItems();
    this.total = this.productos.reduce((acc, producto) => acc + producto.precio, 0);
  }

  pagar() {
    const cardForm = this.mp.cardForm({
      amount: this.total.toString(),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular de la tarjeta' },
        cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'E-mail' },
        cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número de la tarjeta' },
        cardExpirationDate: { id: 'form-checkout__cardExpirationDate', placeholder: 'MM/YY' },
        securityCode: { id: 'form-checkout__securityCode', placeholder: 'Código de seguridad' },
        installments: { id: 'form-checkout__installments', placeholder: 'Cuotas' },
        identificationType: { id: 'form-checkout__identificationType', placeholder: 'Tipo de documento' },
        identificationNumber: { id: 'form-checkout__identificationNumber', placeholder: 'Número de documento' },
        issuer: { id: 'form-checkout__issuer', placeholder: 'Banco emisor' }
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
        },
        onSubmit: (event: Event) => {
          event.preventDefault();

          const {
            paymentMethodId,
            issuerId,
            cardholderEmail,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType
          } = cardForm.getCardFormData();

          const pago = {
            token: token,
            monto: amount,
            descripcion: `Compra de productos`,
            metodoPago: paymentMethodId,
            email: cardholderEmail,
            productos: this.productos
          };

          this.mpService.crearPago(pago).subscribe(
            response => {
              alert('Pago realizado con éxito');
              this.cartService.clearCart();
            },
            error => {
              alert('Error al realizar el pago: ' + error.message);
            }
          );
        }
      }
    });
  }
}
