import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import apis from "@/helpers/apis";
import request from "@/helpers/request";
import { useState } from "react";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { OutgoingOrders } from "@/pages/api/Database/models/OutgoingOrders";
import { useMediaQuery } from "@mui/material";
import Order from "../Order";
interface Props {
  onChangeOrder: (order: OutgoingOrders) => void;
}
export default function ShippingOrder(props: Props) {
  const [searchOrder, setSearchOrder] = useState<string>();
  const isMobile = useMediaQuery("(max-width: 480px)");
  // Queries
  const query = useQuery<OutgoingOrders[]>({
    queryFn: () => request(apis.getOrderOut),
    queryKey: [apis.getOrderOut, searchOrder],
  });
  const data = query.data;

  // OrderID consults the order
  const orderSearched = query.data?.filter(
    (ite) => ite.OrderID.toString() == searchOrder
  );

  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };
  const visibleResults = data?.slice(0, 3);
  const visibleResultToSearch = data?.slice(0, 1);
  const visibleResultsForMobile = data?.slice(0, 1);
  return (
    <>
      {isMobile ? (
        <>
          <div className={styles.searchContainer}>
            Ordenes de despacho
            <i className={styles.fafasearch} onClick={handleSearchClick}>
              <AiOutlineSearch />
            </i>
          </div>
          <div className={styles.orderscontainer}>
            {searchActive && (
              <input
                type="text"
                placeholder="Buscar orden por ID"
                className={styles.searchbar}
                value={searchOrder ? searchOrder : ""}
                onChange={(e) => setSearchOrder(e.target.value)}
              />
            )}

            {orderSearched?.length
              ? orderSearched?.map((item, index) => (
                  <div
                    key={index}
                    className={styles.order}
                    onClick={() => props.onChangeOrder(item)}
                  >
                    N°{item.OrderID} <br></br>
                    <p className={styles.status}>
                      {item.Status == 0
                        ? "Abierto"
                        : item.Status == 1
                        ? "Despacho"
                        : item.Status == 2
                        ? "Transito"
                        : item.Status == 3
                        ? "Cerrado"
                        : null}
                    </p>
                  </div>
                )) || "No result"
              : visibleResultsForMobile?.map((item, index) => (
                  <div
                    key={index}
                    className={styles.order}
                    onClick={() => props.onChangeOrder(item)}
                  >
                    N°{item.OrderID} <br></br> {index == 0 ? "Nuevo - " : null}
                    {item.Status == 0
                      ? "Abierto"
                      : item.Status == 1
                      ? "Despacho"
                      : item.Status == 2
                      ? "Transito"
                      : item.Status == 3
                      ? "Cerrado"
                      : ""}
                  </div>
                ))}
          </div>
        </>
      ) : (
        <div className={styles.orderscontainer}>
          <div className={styles.searchContainer}>
            Ordenes de despacho
            <i className={styles.fafasearch} onClick={handleSearchClick}>
              <AiOutlineSearch />
            </i>
            {searchActive && (
              <input
                type="text"
                placeholder="Buscar orden por ID"
                className={styles.searchbar}
                value={searchOrder ? searchOrder : ""}
                onChange={(e) => setSearchOrder(e.target.value)}
              />
            )}
          </div>

          {orderSearched?.length
            ? orderSearched?.map((item, index) => (
                <div
                  key={index}
                  className={styles.order}
                  onClick={() => props.onChangeOrder(item)}
                >
                  N°{item.OrderID} <br></br>
                  <p className={styles.status}>
                    {item.Status == 0
                      ? "Abierto"
                      : item.Status == 1
                      ? "Despacho"
                      : item.Status == 2
                      ? "Transito"
                      : item.Status == 3
                      ? "Cerrado"
                      : null}
                  </p>
                </div>
              )) || "No result"
            : visibleResults?.map((item, index) => (
                <div
                  key={index}
                  className={styles.order}
                  onClick={() => props.onChangeOrder(item)}
                >
                  N°{item.OrderID} <br></br> {index == 0 ? "Nuevo - " : null}
                  {item.Status == 0
                    ? "Abierto"
                    : item.Status == 1
                    ? "Recibo"
                    : item.Status == 2
                    ? "Transito"
                    : item.Status == 3
                    ? "Cerrado"
                    : ""}
                </div>
              ))}
        </div>
      )}
    </>
  );
}
