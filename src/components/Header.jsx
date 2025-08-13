import { Link } from "react-router";
import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";

export default function Header({ cart }) {
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const itemCount = cart.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className={styles.header}>
      <Link to="/"><h1 className={styles.phrase}>TRJ MEGASTORE</h1></Link>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link to="/login">
          <button className={styles.btn}>Login</button>
        </Link>
        <Link to="/cadastro">
          <button className={styles.btn}>Cadastro</button>
        </Link>
        <div className={styles.cart}>
          <Link to="/cart" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBasket size={24} />
            {itemCount > 0 && (
              <span className={styles.span}>{itemCount}</span>
            )}
          </Link>
          <p>
            Total $: {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
