import { Table, Column, Model, PrimaryKey, Sequelize, HasMany } from "sequelize-typescript";
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
  @Column
  Product_ID!: number;

  @Column
  Product_Name!: string;

  @Column
  Weight!: number;

  @Column
  Length!: number;

  @Column
  Width!: number;

  @Column
  Height!: number;

  @Column
  Brand!: string;

  /*@HasMany(() => UniqueProduct)
  uniqueProducts!: UniqueProduct[];*/
}