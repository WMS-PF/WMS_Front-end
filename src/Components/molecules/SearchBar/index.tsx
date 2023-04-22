import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
export default function SearchBar() {
  return (
    <>
      <div className={styles.searchbar}>
        {" "}
        <AiOutlineSearch /> {""} Buscar
      </div>
      <div className={styles.resultdiv}></div>
    </>
  );
}
