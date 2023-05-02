import { Sequelize } from "sequelize-typescript";
import { Product } from "./models/Product.model";
import { UniqueProduct } from "./models/UniqueProduct.model";
import { IncomingOrders } from "./models/IncomingOrders";
import { Op } from "sequelize";
import { OutgoingOrders } from "./models/OutgoingOrders";
import { Availability } from "./models/Availability";
require("dotenv").config();

//Initialize Sequelize Instance With defined modules
export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: "postgres",
  username: process.env.USUARIO,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  models: [Product, UniqueProduct, IncomingOrders, OutgoingOrders, Availability], //Table Models
});

//GET info about product with the productID
export async function getProduct(ID: string) {
  const object = await Product.findAll({
    where: {
      Product_ID: {
        [Op.eq]: ID,
      },
    },
  });
  return object;
}
export async function getAllProducts() {
  const object = await Product.findAll({
  });
  return object;
}
export async function getSomeProducts(ID: string[]) {
  const object = await Product.findAll({
    where: {
      Product_ID: {
        [Op.or]: ID,
      },
    },
  });
  return object;
}
//GET info about product with the productID
export async function getOrderIn() {
  const object = await IncomingOrders.findOne({
    where: { Status: 1 },
  });
  return object;
}

export async function getAllOrderIn() {
  const object = await IncomingOrders.findAll();
  return object;
}

export async function getAvailability() {
  const object = await Availability.findAll({
    attributes: ['Product_Name', 'Product_ID', 'count']
  });
  return object;
}

export async function getOrderOut() {
  const object = await OutgoingOrders.findOne({
    where: { Status: 0 },
  });
  return object;
}

export async function getAllOrderOut() {
  const object = await OutgoingOrders.findAll();
  return object;
}

export async function postUInfo(productID: number, serialID: number, status: number, inDate: Date, outDate: Date, inID: number, outID: number) {
  const object = await UniqueProduct.create({
    Product_ID: productID,
    Serial_ID: serialID,
    Status: status,
    InDate: inDate,
    OutDate: outDate,
    InID: inID,
    OutID: outID
  });
  return object
}