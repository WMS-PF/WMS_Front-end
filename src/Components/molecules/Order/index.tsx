import styles from "./styles.module.css";
import { HiOfficeBuilding } from "react-icons/hi";
import "react-loading-skeleton/dist/skeleton.css";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import Product from "../Product";
import { useQuery } from "react-query";
import request from "@/helpers/request";
import apis from "@/helpers/apis";
import { Product as ProductModel } from "@/pages/api/Database/models/Product.model";
import SearchBar from "../SearchBar";
import { useState } from "react";
import { MdStore } from "react-icons/md";
import { BiTaskX, BiTask } from "react-icons/bi";
import { Availability } from "@/pages/api/Database/models/Availability";
import Skeleton from "react-loading-skeleton";

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
  console.log(query.data);
  const productSearched = query.data?.find(
    (ite) => ite.ProductName == searchProduct
  );

  return (
    <>
      <div className={styles.listcontainer}>
        <div className={styles.orderinfo}>
          <br></br>
          <h3> N° orden {props.order?.OrderID}</h3>
          <br></br>

          <p className={styles.p}>
            <HiOfficeBuilding size={24} />
            Proovedor: {props.order?.Provider}
          </p>
          <p className={styles.p}>
            {" "}
            <MdStore size={24} />
            Ciudad: {props.order?.City}{" "}
          </p>
          <p className={styles.p}>
            {props.order?.Status == 1 ? (
              <BiTaskX size={23} />
            ) : (
              <BiTask size={23} />
            )}
            Estado del pedido:{" "}
            {props.order?.Status == 1 ? "Abierto" : "Cerrado"}
          </p>

          <p className={styles.p}></p>
        </div>
        <br></br>
        <br></br>
        <div className={styles.table}>
          <th>Descripción</th>
          <th>Cantidad</th>
        </div>

        {products.map((item, index) => (
          <Product
            key={item}
            id={item}
            quantity={(props.order?.Products as Record<string, number>)[item]}
            data={query.data?.find((ite) => ite.ItemCode == item)}
          />
        ))}
      </div>
      <div className={styles.searchContainer}>
        <SearchBar value={searchProduct} setValue={setSearchProduct} />
        <div className={styles.searchResultContainer}>
          {productSearched ? (
            <>
              <h4>Detalles del producto</h4>
              <h2>{productSearched?.ProductName}</h2>

              <br></br>
              <h4>Proveedor</h4>
              <p>Marca: {productSearched?.Brand}</p>
              <br></br>
              <h4>Dimensiones</h4>
              <p>Largo: {productSearched?.Length}</p>
              <p>Alto: {productSearched?.Height}</p>
              <p>Ancho: {productSearched?.Width}</p>
              <p>Peso (kg): {productSearched?.Weight}</p>
            </>
          ) : (
            <>
              <h4>Detalles del producto</h4>
              <Skeleton />
              <br></br>
              <h4>Proveedor</h4>
              <p>
                Marca :<Skeleton />{" "}
              </p>
              <br></br>
              <h4>Dimensiones</h4>
              <Skeleton count={4} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
