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
interface Props {
  order: IncomingOrders | null;
}
export default function Order(props: Props) {
  const products = Object.keys(props.order?.Products ?? {});
  const isMobile = useMediaQuery("(max-width: 480px)");
  const [itemCode, setItemCode] = useState<string | null>(null);
  // Queries
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
            {props.order?.Status == 1
              ? "Abierto"
              : props.order?.Status == 2
              ? "Despacho"
              : props.order?.Status == 3
              ? "Transito"
              : props.order?.Status == 3
              ? "Cerrado"
              : null}
          </p>

          <p className={styles.p}></p>
        </div>
        <br></br>
        <br></br>
        <div className={styles.table}>
          <p className={styles.p}>Descripción</p>
          <p className={styles.p}>Cantidad</p>
        </div>

        {query.data?.map((item, index) => (
          <Product
            key={item.ItemCode}
            quantity={
              (props.order?.Products as Record<string, number>)?.[item.ItemCode]
            }
            data={item}
            onClick={() => {
              setItemCode(item.ItemCode);
            }}
          />
        ))}
      </div>

      {isMobile ? null : (
        <ProductDetails itemCode={itemCode} setItemCode={setItemCode} />
      )}
    </>
  );
}
