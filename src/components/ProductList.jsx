import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Product from "./Product.jsx";

export function ProductList({  addToCart }) {
  const category = "laptops";
  const limit = 12;
  const apiURL = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description,stock`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {loading && (
        <div>
          <CircularProgress
            size="10rem"
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{
              color: "#001111",
            }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message}</p>}
    </div>
  );
}
