import styles from "./styles.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import Product from "../Product";
import { useQuery } from "react-query";
import request from "@/helpers/request";
import apis from "@/helpers/apis";
import { Product as ProductModel } from "@/pages/api/Database/models/Product.model";
import SearchBar from "../SearchBar";
import { useState } from "react";
interface Props {
  order: IncomingOrders | null;
}

export default function Order(props: Props) {
  const [searchProduct, setSearchProduct] = useState<string>("");
  const products = Object.keys(props.order?.Products ?? {});
  // Queries
  const query = useQuery<ProductModel[]>({
    queryFn: () => request(apis.getProduct + products.join(",")),
    queryKey: [apis.getProduct + products.join(",")],
  });
  const productSearched = query.data?.find(
    (ite) => ite.Product_Name == searchProduct
  );
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };
  return (
    <>
      <div className={styles.listcontainer}>
        <div className={styles.orderinfo}>
          <p className={styles.p}>Empresa: {props.order?.Company}</p>
          <p className={styles.p}>Sucursal: {props.order?.Office} </p>
          <p className={styles.p}>Estado del pedido: {props.order?.Status}</p>
          <p className={styles.p}></p>
        </div>
        <h3 className={styles.h3}>Productos</h3>
        {products.map((item, index) => (
          <Product
            key={item}
            id={item}
            quantity={(props.order?.Products as Record<string, number>)[item]}
            data={query.data?.find((ite) => ite.Product_ID.toString() == item)}
          />
        ))}
      </div>
      <div className={styles.searchContainer}>
        <SearchBar value={searchProduct} setValue={setSearchProduct} />
        {productSearched?.Product_Name}
        {productSearched?.Length}
      </div>
    </>
  );
}
