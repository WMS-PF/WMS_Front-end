import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import apis from "@/helpers/apis";
import request from "@/helpers/request";
import { useState } from "react";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMediaQuery } from "@mui/material";
interface Props {
  onChangeOrder: (order: IncomingOrders) => void;
}

export default function IncomeOrder(props: Props) {
  const [searchOrder, setSearchOrder] = useState<number>();
  const isMobile = useMediaQuery("(max-width: 480px)");
  // Queries
  const query = useQuery<IncomingOrders[]>({
    queryFn: () => request(apis.getOrderIn),
    queryKey: [apis.getOrderIn],
  });
  const data = query.data;
  //
  // OrderID consults the order
  const orderSearched = query.data?.find((ite) => ite.OrderID == searchOrder);
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
            Ordenes de ingreso
            <i className={styles.fafasearch} onClick={handleSearchClick}>
              <AiOutlineSearch />
            </i>
          </div>
          <div className={styles.orderscontainer}>
            {searchActive && (
              <input
                type="text"
                placeholder="Search"
                className={styles.searchbar}
                value={searchOrder ? searchOrder : ""}
                onChange={(e) => setSearchOrder(parseInt(e.target.value))}
              />
            )}

            {orderSearched
              ? visibleResultToSearch?.map((item, index) => (
                  <div
                    key={index}
                    className={styles.order}
                    onClick={() => props.onChangeOrder(item)}
                  >
                    N°{orderSearched.OrderID} <br></br>
                    <p className={styles.status}>
                      {orderSearched.Status == 0 ? "Abierto" : null}
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
                      ? "Recibo"
                      : item.Status == 2
                      ? "Tramite"
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
            Ordenes de ingreso
            <i className={styles.fafasearch} onClick={handleSearchClick}>
              <AiOutlineSearch />
            </i>
            {searchActive && (
              <input
                type="text"
                placeholder="Search"
                className={styles.searchbar}
                value={searchOrder ? searchOrder : ""}
                onChange={(e) => setSearchOrder(parseInt(e.target.value))}
              />
            )}
          </div>

          {orderSearched
            ? visibleResultToSearch?.map((item, index) => (
                <div
                  key={index}
                  className={styles.order}
                  onClick={() => props.onChangeOrder(item)}
                >
                  N°{orderSearched.OrderID} <br></br>
                  <p className={styles.status}>
                    {orderSearched.Status == 0
                      ? "Abierto"
                      : orderSearched.Status == 1
                      ? "Recibo"
                      : orderSearched.Status == 2
                      ? "Tramite"
                      : orderSearched.Status == 3
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
                    ? "Tramite"
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
