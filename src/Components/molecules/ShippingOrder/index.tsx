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
interface Props {
  onChangeOrder: (order: OutgoingOrders) => void;
}
export default function ShippingOrder(props: Props) {
  // Queries
  const query = useQuery<OutgoingOrders[]>({
    queryFn: () => request(apis.getOrderOut),
    queryKey: [apis.getOrderOut],
  });
  const data = query.data;
  // Search order by orderID
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };
  const visibleResults = data?.slice(0, 3);
  return (
    <>
      <div className={styles.orderscontainer}>
        <div className={styles.searchContainer}>
          Ordenes de despacho
          <i className={styles.fafasearch} onClick={handleSearchClick}>
            <AiOutlineSearch />
          </i>
          {searchActive && (
            <input
              type="text"
              placeholder="Search"
              className={styles.searchbar}
              onChange={(e) => console.log(e.target.value)}
            />
          )}
        </div>

        {query.isFetching ? (
          <Skeleton count={3} className={styles.order} />
        ) : (
          visibleResults?.map((item, index) => (
            <div
              key={index}
              className={styles.order}
              onClick={() => props.onChangeOrder(item)}
            >
              N°{item.OrderID} <br></br> {index == 0 ? "Nuevo - " : null}
              {item.Status == 1 ? "Abierto" : "Cerrado"}
            </div>
          ))
        )}
      </div>
    </>
  );
}
