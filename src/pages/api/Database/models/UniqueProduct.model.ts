import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
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
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  ID!: number;
  
  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  ItemCode!: string;

  @Column({
    type: DataType.STRING(16),
    allowNull: true
  })
  SerialCode!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  Status!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  InDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  OutDate!: Date;

  @ForeignKey(() => IncomingOrders)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  InID!: number;

  @ForeignKey(() => OutgoingOrders)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  OutID!: number;

  @BelongsTo(() => OutgoingOrders)
  outgoingOrder!: OutgoingOrders;

  @BelongsTo(() => IncomingOrders)
  incomingOrder!: IncomingOrders;

  @BelongsTo(() => Product)
  product!: Product;

}