import { Table, Column, Model, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { UniqueProduct } from "./UniqueProduct.model";

//Define options of the table
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    paranoid: false,
    deletedAt: false,
    modelName: 'IncomingOrders',
    freezeTableName: true
})
//define Model of the table and the columns
export class IncomingOrders extends Model {

   
  @PrimaryKey
  @Column
  OrderID!: number;

  @Column
  Company!: string;

  @Column
  Office!: number;

  @Unique
  @Column({ unique: true })
  Date!: Date;

  @Column(DataType.JSONB)
  Products!: object;

  @Column
  Status!: number;

  @HasMany(() => UniqueProduct, { foreignKey: 'InID' })
  uniqueProducts!: UniqueProduct[];

  @HasMany(() => UniqueProduct, { foreignKey: 'InDate' })
  uniqueProducts!: UniqueProduct[];

}