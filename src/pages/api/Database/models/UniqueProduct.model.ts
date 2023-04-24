import { Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

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
  
  @Column
  Product_ID!: number;

  @Column
  Serial_ID!: number;

  @Column
  Status!: number;

  @Column
  Date!: Date;

}