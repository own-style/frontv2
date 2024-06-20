import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         ReactiveFormsModule,   
         Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, 
        MatDialogModule,
        MatDialogRef} from '@angular/material/dialog';
import { ProductosService } from '../../../../services/productos.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-crear-productos',
  standalone: true,
  imports: [MatButtonModule,
            MatDialogModule,
            ReactiveFormsModule,
            MatFormFieldModule                       
  ],
  templateUrl: './crear-productos.component.html',
  styleUrl: './crear-productos.component.scss'
})
export class CrearProductosComponent implements OnInit {

  @Output() productoCreado = new EventEmitter<void>();

  
  readonly dialog = inject(MatDialog);
  selectedFile: File | null = null;  
  crearProductoForm! : FormGroup;
  
  constructor(private form: FormBuilder,
              private sproducto: ProductosService,
    private mat: MatDialogRef<CrearProductosComponent>
  ) {
    
  }
  ngOnInit(): void {
    this.crearProductoForm = this.form.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      precio: ['',Validators.required],      
    })        
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  cancelar() {
  this.mat.close()
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(CrearProductosComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  crear(): void {
    if (this.crearProductoForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.crearProductoForm.get('nombre')!.value);
      formData.append('descripcion', this.crearProductoForm.get('descripcion')!.value);
      formData.append('precio', this.crearProductoForm.get('precio')!.value);
      formData.append('imagen', this.selectedFile);

      this.sproducto.createProductos(formData).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            timer: 1500,
            text: '¡Producto creado con éxito!'
          });
          this.crearProductoForm.reset();
          this.selectedFile = null; // Reset the selected file
          this.productoCreado.emit(); // Emit the event to inform that a product was created
          this.mat.close();
                    
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
