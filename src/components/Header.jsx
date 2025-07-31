import { Link } from "react-router";  
import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";

export default function Header({ cart }) {
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const itemCount = cart.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className={styles.header}>
      <Link to="/"><h1 className={styles.phrase}>TRJ MEGASTORE</h1></Link>
      <div className={styles.cart}>
        <Link to="/cart" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ShoppingBasket size={24} />
          {itemCount > 0 && (
            <span
              style={{
                background: "#00f59b",
                color: "#002218",
                borderRadius: "50%",
                padding: "0.2em 0.7em",
                fontSize: "1.3rem",
                fontWeight: "bold",
                border: "2px solid #fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
              }}
            >
              {itemCount}
            </span>
          )}
        </Link>
        <p>
          Total $: {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
