import { Table, Column, Model, PrimaryKey, DataType, HasMany, Unique } from 'sequelize-typescript';
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
  @Column({
    type: DataType.BIGINT,
    allowNull: false
  })
  OrderID!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  Provider!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  City!: string;

  @Unique
  @Column({ 
    type: DataType.DATE,
    allowNull: false,
    unique: true
  })
  Date!: Date;

  @Column({
    type: DataType.JSONB,
    allowNull: false
  })
  Products!: object;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  Status!: number;

  @HasMany(() => UniqueProduct, { foreignKey: 'InID' })
  uniqueProducts!: UniqueProduct[];

}