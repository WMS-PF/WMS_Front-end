import { Sequelize } from "sequelize-typescript";
import { Product } from "./models/Product.model";
import { UniqueProduct } from "./models/UniqueProduct.model";
import { IncomingOrders } from "./models/IncomingOrders";
import { Op } from "sequelize";
import { OutgoingOrders } from "./models/OutgoingOrders";
import { Availability } from "./models/Availability";
require("dotenv").config();

const currentDate = new Date();

//Initialize Sequelize Instance With defined modules
export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: "postgres",
  username: process.env.USUARIO,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  models: [
    Product,
    UniqueProduct,
    IncomingOrders,
    OutgoingOrders,
    Availability,
  ], //Table Models
});

//GET info about product with the productID
export async function getProduct(ID: string) {
  const object = await Product.findAll({
    where: {
      ItemCode: {
        [Op.eq]: ID,
      },
    },
  });
  return object;
}
export async function getAllProducts() {
  const object = await Product.findAll({});
  return object;
}
export async function getSomeProducts(ID: string[]) {
  const object = await Product.findAll({
    where: {
      ItemCode: {
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
    attributes: ["ProductName", "ItemCode", "availability"],
  });
  return object;
}

export async function getOrderOut() {
  const object = await OutgoingOrders.findOne({
    where: { Status: 1 },
  });
  return object;
}

export async function getAllOrderOut() {
  const object = await OutgoingOrders.findAll();
  return object;
}

export async function postUInfo(
  productID: string,
  serialID: number | null,
  status: number,
  inDate: Date,
  outDate: Date | null,
  inID: number,
  outID: number | null
) {
  const object = await UniqueProduct.create({
    ItemCode: productID,
    SerialCode: serialID,
    Status: status,
    InDate: inDate,
    OutDate: outDate,
    InID: inID,
    OutID: outID,
  });
  return object;
}

export async function getOrderOutStandBy() {
  const object = await OutgoingOrders.findAll({
    where: { Status: 0 },
  });
  return object;
}

export async function getOrderOutProcess() {
  const object = await OutgoingOrders.findAll({
    where: { Status: 1 },
  });
  return object;
}

export async function getOrderOutTransit() {
  const object = await OutgoingOrders.findAll({
    where: { Status: 2 },
  });
  return object;
}

export async function getOrderOutDelayed() {
  const object = await OutgoingOrders.findAll({
    where: { Date: { [Op.lt]: currentDate } },
  });
  return object;
}

export async function getOrderInStandBy() {
  const object = await IncomingOrders.findAll({
    where: { Status: 0 },
  });
  return object;
}

export async function getOrderInProcess() {
  const object = await IncomingOrders.findAll({
    where: { Status: 1 },
  });
  return object;
}

export async function getOrderInReceived() {
  const object = await IncomingOrders.findAll({
    where: { Status: { [Op.in]: [2, 3] } },
  });
  return object;
}

export async function getOrderInDelayed() {
  const object = await IncomingOrders.findAll({
    where: { Date: { [Op.lt]: currentDate } },
  });
  return object;
}
