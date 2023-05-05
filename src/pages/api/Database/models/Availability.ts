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

   
  @Column({
    type: DataType.TEXT,
  })
  ProductName!: string;

  @Column({
    type: DataType.STRING(20),
  })
  ItemCode!: string;

  @Column({
    type: DataType.BIGINT,
  })
  availability!: number;
}