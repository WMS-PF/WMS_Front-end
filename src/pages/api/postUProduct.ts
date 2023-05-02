import type { NextApiRequest, NextApiResponse } from "next";
import { postUInfo, sequelize } from "./Database/Database";

sequelize;

// POST handler for unique product
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    for (const item of data) {
      const productID = item.ProductID;
      const serialID = item.SerialID;
      const status = item.Status;
      const inDate = item.InDate;
      const outDate = item.OutDate;
      const inID = item.InID;
      const outID = item.OutID;

      await postUInfo(productID, serialID, status, inDate, outDate, inID, outID);
    }

    console.log("OK");
    res.status(200).json("OK");
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}