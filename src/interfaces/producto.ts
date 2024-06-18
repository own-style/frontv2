export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
    imagen?: string;
  }

  export interface ProductoCreacionDTO {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: File;
  }