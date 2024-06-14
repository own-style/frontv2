export interface ProductoDTO {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
  }

  export interface ProductoCreacionDTO {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: File;
  }