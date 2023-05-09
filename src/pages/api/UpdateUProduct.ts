import { NextApiRequest, NextApiResponse } from "next";
import { sequelize } from "./Database/Database";
import { UniqueProduct } from "./Database/models/UniqueProduct.model";

sequelize

// PUT handler for updating unique products
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const updatedProducts = req.body;

      for (const product of updatedProducts) {
        const productId = product.ItemCode;
        const status = product.Status;
        const outDate = product.OutDate;
        const outID = product.OutID;

        // Buscar el primer producto con el ID correspondiente y que no haya sido despachado
        const productToUpdate = await UniqueProduct.findOne({
          where: { ItemCode: productId, Status: 0 },
        });

        if (productToUpdate) {
          // Actualizar el producto
          productToUpdate.Status = status;
          productToUpdate.OutDate = outDate;
          productToUpdate.OutID = outID;

          // Guardar los cambios en la base de datos
          await productToUpdate.save();
        }
      }

      res.status(200).json({ message: "Productos actualizados con éxito" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Error al actualizar los productos: ${error}` });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}