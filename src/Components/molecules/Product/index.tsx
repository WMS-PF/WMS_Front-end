import apis from "@/helpers/apis";
import request from "@/helpers/request";
import { Product as ProductModel } from "@/pages/api/Database/models/Product.model";
import { useQuery } from "react-query";
import styles from "./styles.module.css";
interface Props {
  id: string;
  quantity: number;
  data?: ProductModel;
}
export default function Product(props: Props) {
  return (
    <>
      <div className={styles.orderdetailinfo}>
        {props.data?.Product_Name}
        <div>{props.quantity}</div>
      </div>
    </>
  );
}
