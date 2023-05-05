import { Table, Column, Model, PrimaryKey, Sequelize, HasMany, AutoIncrement, DataType } from "sequelize-typescript";
import { UniqueProduct } from "./UniqueProduct.model";

//Define options of the table
@Table({
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  paranoid: false,
  deletedAt: false,
  modelName: "Product",
})
//define Model of the table and the columns
export class Product extends Model {
  
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  ID!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  ProductName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  Brand!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  ItemCode!: string;
  
  @Column({
    type: DataType.STRING(16),
    allowNull: false
  })
  Reference!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  Description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  Length!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  Width!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  Height!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  Weight!: number;

}