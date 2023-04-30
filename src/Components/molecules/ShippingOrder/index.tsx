import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import apis from "@/helpers/apis";
import request from "@/helpers/request";
import { useState } from "react";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Props {
  onChangeOrder: (order: IncomingOrders) => void;
}
export default function IncomeOrder(props: Props) {
  // Queries
  const query = useQuery<IncomingOrders[]>({
    queryFn: () => request(apis.getOrderIn),
    queryKey: [apis.getOrderIn],
  });
  const data = query.data;
  // Search order by orderID
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };
  return (
    <>
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
            onChange={(e) => console.log(e.target.value)}
          />
        )}
      </div>
      <div className={styles.orderscontainer}>
        {query.isFetching ? (
          <Skeleton count={3} className={styles.order} />
        ) : (
          data?.map((item, index) => (
            <div
              key={index}
              className={styles.order}
              onClick={() => props.onChangeOrder(item)}
            >
              N°{item.OrderID} <br></br> {index == 0 ? "Nuevo - " : null}
              {item.Status}
            </div>
          ))
        )}
      </div>
    </>
  );
}
