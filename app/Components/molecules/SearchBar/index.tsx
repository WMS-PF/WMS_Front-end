import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
export default function SearchBar() {
  return (
    <div>
      <div className={styles.searchbar}>
        {" "}
        <AiOutlineSearch /> {""} Buscar
      </div>
      <div className={styles.resultdiv}></div>
    </div>
  );
}
