import type { NextApiRequest, NextApiResponse } from "next";
import { getInfo, sequelize } from "./Database/Database";

sequelize;

//GET handler for product information
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productID = req.query.productID;
  const object = await getInfo(productID);
  console.log(object);
  res.status(200).json(object);
}
