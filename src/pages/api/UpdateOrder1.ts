import { OutgoingOrders } from "./Database/models/OutgoingOrders";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function updateOrderStatus2to3(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "PUT") {
      try {
        const { OrderID } = req.body;
  
        // Buscar la orden con el ID correspondiente y con estado 2
        const orderToUpdate = await OutgoingOrders.findOne({
          where: { OrderID: OrderID },
        });
  
        if (orderToUpdate) {
          // Actualizar el estado de la orden
          orderToUpdate.Status = 2;
  
          // Guardar los cambios en la base de datos
          await orderToUpdate.save();
        }
  
        res.status(200).json({ message: "Orden actualizada con éxito" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error al actualizar la orden: ${error}` });
      }
    } else {
      res.status(405).json({ message: "Método no permitido" });
    }
  }
  