import { Table, Column, Model, PrimaryKey, DataType} from 'sequelize-typescript';

//Define options of the table
@Table({
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    paranoid: false,
    deletedAt: false,
    modelName: 'OrdenesDespacho',
    freezeTableName: true
})
//define Model of the table and the columns
export class OrdenesDespacho extends Model {

   
  @PrimaryKey
  @Column
  OrdenID!: number;

  @Column
  Empresa!: string;

  @Column
  Sucursal!: number;

  @Column
  Fecha!: Date;

  @Column(DataType.JSONB)
  Products!: object;

  @Column
  Status!: number;
}