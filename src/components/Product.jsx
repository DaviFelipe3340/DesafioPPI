import styles from "./Product.module.css";
import { ShoppingCart } from "lucide-react";

export default function Product({ product, addToCart }) {
  return (
    <div className={styles.product}>
      <img
        src={product.thumbnail}
        alt={product.title}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.productQty}>
        <p className={styles.productPrice}>${product.price}</p>
      </div>
      <button
        className={styles.btn}
        onClick={() => addToCart(product)}
      >
        ADD TO CART <ShoppingCart />
      </button>
    </div>
  );
}
