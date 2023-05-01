import { Table, Column, Model, PrimaryKey, DataType} from 'sequelize-typescript';

//Define options of the table
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    paranoid: false,
    deletedAt: false,
    modelName: 'Availability',
    freezeTableName: true
})
//define Model of the table and the columns
export class Availability extends Model {

   
  @Column
  Product_Name!: string;

  @Column
  Product_ID!: number;

  @Column
  count!: number;
}