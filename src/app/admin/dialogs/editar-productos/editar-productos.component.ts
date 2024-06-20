import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductosService } from '../../../../services/productos.service';
import { every } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-productos',
  standalone: true,
  imports: [MatButtonModule,
            MatDialogModule,
            ReactiveFormsModule,
            MatFormFieldModule  ],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.scss'
})
export class EditarProductosComponent implements OnInit {
  
  
  readonly dialog = inject(MatDialog);
  selectedFile: File | null = null;  
  editarProductoForm!: FormGroup;
  
  constructor(private form:FormBuilder,
              private sproducto:ProductosService,
              private mat:MatDialogRef<EditarProductosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any // Aquí recibes el ID del producto

  ) {

  }

  ngOnInit(): void {
    this.editarProductoForm = this.form.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['']
    });
    this.sproducto.getProductoById(this.data.id).subscribe(producto =>{
      this.editarProductoForm.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio
      });
    });
  }
  
  onFileSelected(event: any):void {
    const file = event?.target.files[0];
    if(file){
      this.selectedFile = file;
    }
  
  }
  cancelar(): void {
    this.mat.close();
  }
  editar(): void {
    if (this.editarProductoForm.valid) {
      const formData = new FormData();
      formData.append('nombre', this.editarProductoForm.get('nombre')!.value);
      formData.append('descripcion', this.editarProductoForm.get('descripcion')!.value);
      formData.append('precio', this.editarProductoForm.get('precio')!.value);
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      }

      this.sproducto.updateProducto(this.data.id, formData).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Producto editado',
            timer: 1500,
            text: '¡Producto editado con éxito!'
          });
          this.mat.close(true);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message
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
