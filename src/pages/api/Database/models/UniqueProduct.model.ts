import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './Product.model';
import { OutgoingOrders } from './OutgoingOrders';
import { IncomingOrders } from './IncomingOrders';


//Define options of the table
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    paranoid: false,
    deletedAt: false,
    modelName: 'UniqueProduct',
})
//define Model of the table and the columns
export class UniqueProduct extends Model {

   
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number
  
  @ForeignKey(() => Product)
  @Column
  ProductID!: number;

  @Column
  SerialID!: number;

  @Column
  Status!: number;

  @ForeignKey(() => IncomingOrders)
  @Column
  InDate!: Date;

  @ForeignKey(() => OutgoingOrders)
  @Column
  OutDate!: Date;

  @ForeignKey(() => IncomingOrders)
  @Column
  InID!: number;

  @ForeignKey(() => OutgoingOrders)
  @Column
  OutID!: number;

  @BelongsTo(() => OutgoingOrders)
  outgoingOrder!: OutgoingOrders;

  @BelongsTo(() => IncomingOrders)
  incomingOrder!: IncomingOrders;

  @BelongsTo(() => Product)
  product!: Product;

}