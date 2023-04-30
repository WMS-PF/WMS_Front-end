import { Sequelize } from "sequelize-typescript";
import { Product } from "./models/Product.model";
import { UniqueProduct } from "./models/UniqueProduct.model";
import { OrdenesIngreso } from "./models/OrdenesIngreso.model";
import { Op } from "sequelize";
import { OrdenesDespacho } from "./models/OrdenesDespacho.model";
require("dotenv").config();

//Initialize Sequelize Instance With defined modules
export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: "postgres",
  username: process.env.USUARIO,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  models: [Product, UniqueProduct, OrdenesIngreso, OrdenesDespacho], //Table Models
});

//GET info about product with the productID
export async function getInfo(ID: string | string[] | undefined) {
  const object = await Product.findAll({
    where: {
      Product_ID: {
        [Op.eq]: ID,
      },
    },
  });
  return object;
}

//GET info about product with the productID
export async function postUInfo(
  ID: string | string[] | undefined,
  serialID: string | string[] | undefined,
  status: string | string[] | undefined,
  date: string | string[] | undefined
) {
  const object = await UniqueProduct.create({
    Product_ID: ID,
    Serial_ID: serialID,
    Status: status,
    Date: date,
  });
}
export async function getOrderIn() {
  const object = await OrdenesIngreso.findOne({
    where: { Status: 1 },
  });
  return object;
}
export async function getAllOrderIn() {
  const object = await OrdenesIngreso.findAll();
  return object;
}
