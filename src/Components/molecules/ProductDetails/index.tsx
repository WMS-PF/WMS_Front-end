import { useState } from "react";
import SearchBar from "../SearchBar";
import request from "@/helpers/request";
import apis from "@/helpers/apis";
import { useQuery } from "react-query";
import { Product as ProductModel } from "@/pages/api/Database/models/Product.model";
import styles from "./styles.module.css";
import { Availability } from "@/pages/api/Database/models/Availability";
import { AiOutlineCloseCircle } from "react-icons/ai";
interface Props {
  itemCode: string | null;
  setItemCode: (itemCode: string | null) => void;
}
export default function ProductDetails(props: Props) {
  const [searchProduct, setSearchProduct] = useState<string>("");
  const query = useQuery<ProductModel[]>({
    queryFn: () => request(apis.getProduct),
    queryKey: [apis.getProduct],
  });
  //Finding products
  const productSearched = query.data?.find(
    (ite) => ite.ProductName == searchProduct || ite.ItemCode == props.itemCode
  );

  //Consulting available products
  const queryForAvailability = useQuery<Availability[]>({
    queryFn: () => request(apis.getAvailability),
    queryKey: [apis.getAvailability],
  });
  const availabilitySearched = queryForAvailability.data?.filter((item) =>
    item.ProductName.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className={styles.searchContainer}>
      <SearchBar value={searchProduct} setValue={setSearchProduct} />
      <div className={styles.searchResultContainer}>
        {productSearched && !searchProduct ? (
          <>
            <div className={styles.close}>
              <h4>Detalles del producto</h4>
              <AiOutlineCloseCircle
                onClick={() => props.setItemCode(null)}
                size={"16px"}
                color={"gray"}
              />
            </div>

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
          <div>
            <h2 className={styles.h2}>Disponible en almacen</h2>
            <div className={styles.descripcion}>
              <h3 className={styles.h3}>Producto</h3>
              <h3 className={styles.h3}>Cantidad</h3>
            </div>
            {availabilitySearched?.map((item, index) => (
              <div
                key={item.ItemCode}
                onClick={() => props.setItemCode(item.ItemCode)}
                className={styles.product}
              >
                {item.ProductName}
                <div className={styles.queantity}>{item.availability}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
