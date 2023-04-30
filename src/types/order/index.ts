export interface OrderDetails {
  index: [
    Empresa: string,
    OrdenId: number,
    Sucursal: number,
    Fecha: Date,
    Products: object,
    Status: number
  ];
}
