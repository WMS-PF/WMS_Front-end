import { Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import { Product } from './Product.model';
import { OutgoingOrders } from './OutgoingOrders.model';
import { IncomingOrders } from './IncomingOrders.model';


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
  Product_ID!: number;

  @Column
  Serial_ID!: number;

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

  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => OutgoingOrders)
  outgoingOrder!: OutgoingOrders;

  @BelongsTo(() => IncomingOrders)
  incomingOrder!: IncomingOrders;

}