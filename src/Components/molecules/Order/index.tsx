import styles from "./styles.module.css";
import { HiOfficeBuilding } from "react-icons/hi";
import "react-loading-skeleton/dist/skeleton.css";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import Product from "../Product";
import { useQuery } from "react-query";
import request from "@/helpers/request";
import apis from "@/helpers/apis";
import { Product as ProductModel } from "@/pages/api/Database/models/Product.model";
import { MdStore } from "react-icons/md";
import { BiTaskX, BiTask } from "react-icons/bi";
import { useMediaQuery } from "@mui/material";
import ProductDetails from "../ProductDetails";
import { useState } from "react";
import { Availability } from "@/pages/api/Database/models/Availability";
import { OutgoingOrders } from "@/pages/api/Database/models/OutgoingOrders";

enum IncomingOrderStatusEnum {
  Abierto = 0,
  Recibo = 1,
  Tramite = 2,
  Cerrado = 3,
}
enum OutgoingOrderStatusEnum {
  Abierto = 0,
  Despacho = 1,
  Transito = 2,
  Cerrado = 3,
}
interface Props {
  order: IncomingOrders | null | OutgoingOrders;
  isIncoming: boolean;
}
export default function Order(props: Props) {
  const products = Object.keys(props.order?.Products ?? {});
  const isMobile = useMediaQuery("(max-width: 480px)");
  const [itemCode, setItemCode] = useState<string | null>(null);
  const IsIncoming = props.isIncoming;

  // Queries for products information
  const query = useQuery<ProductModel[]>({
    queryFn: () => request(apis.getProduct + products.join(",")),
    queryKey: [apis.getProduct + products.join(",")],
  });

  return (
    <>
      <div className={styles.listcontainer}>
        <div className={styles.orderinfo}>
          <br></br>
          <h3> N° orden {props.order?.OrderID}</h3>
          <br></br>

          <p className={styles.p}>
            <HiOfficeBuilding size={21} />
            Proovedor: {props.order?.Provider}
          </p>
          <p className={styles.p}>
            {" "}
            <MdStore size={21} />
            Ciudad: {props.order?.City}{" "}
          </p>
          <p className={styles.p}>
            {props.order?.Status == 1 ? (
              <BiTaskX size={20} />
            ) : (
              <BiTask size={20} />
            )}
            Estado del pedido:{" "}
            {IsIncoming
              ? props.order?.Status == IncomingOrderStatusEnum.Abierto
                ? "Abierto"
                : props.order?.Status == IncomingOrderStatusEnum.Recibo
                ? "Recibo"
                : props.order?.Status == IncomingOrderStatusEnum.Tramite
                ? "Tramite"
                : props.order?.Status == IncomingOrderStatusEnum.Cerrado
                ? "Cerrado"
                : "Sin definir"
              : props.order?.Status == OutgoingOrderStatusEnum.Abierto
              ? "Abierto"
              : props.order?.Status == OutgoingOrderStatusEnum.Despacho
              ? "Despacho"
              : props.order?.Status == OutgoingOrderStatusEnum.Transito
              ? "Transito"
              : props.order?.Status == OutgoingOrderStatusEnum.Cerrado
              ? "Cerrado"
              : "Sin definir2"}
          </p>
        </div>
        <br></br>
        <br></br>
        <div className={styles.table}>
          <p className={styles.p}>Descripción</p>
          <p className={styles.p}>Cantidad</p>
        </div>
        <div>
          {query.data?.map((item, index) => (
            <Product
              key={item.ItemCode}
              quantity={
                (props.order?.Products as Record<string, number>)?.[
                  item.ItemCode
                ]
              }
              data={item}
              onClick={() => {
                setItemCode(item.ItemCode);
              }}
            />
          ))}
        </div>
      </div>

      {isMobile ? null : (
        <ProductDetails itemCode={itemCode} setItemCode={setItemCode} />
      )}
    </>
  );
}
