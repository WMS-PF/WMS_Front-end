import type { NextApiRequest, NextApiResponse } from "next";
import { postUInfo, sequelize } from "./Database/Database";

sequelize;

//POST handler for unique product
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productID = req.query.productID;
  const serialID = req.query.serialID;
  const status = req.query.status;
  const date = req.query.date;
  await postUInfo(productID, serialID, status, date);
  console.log("OK");
  res.status(200).json("OK");
}
