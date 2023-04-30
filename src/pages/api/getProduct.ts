import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProducts, getProduct, getSomeProducts, sequelize } from "./Database/Database";
import { isStringLiteral } from "typescript";

sequelize;

//GET handler for product information
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      
      const { ProductID } = req.query;
      
      if (ProductID && typeof ProductID === "string" && ProductID.trim() !== "") {
        const ProductIDs = ProductID.split(",");
        if (ProductIDs.length > 1) {
          
          const order = await getSomeProducts(ProductIDs);
          res.status(200).json(order);
        } else {
          const order = await getProduct(ProductIDs[0]);
          res.status(200).json(order);
        }
      } else {
        const order = await getAllProducts();
        res.status(200).json(order);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Error Server" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}