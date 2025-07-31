import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Product from "./Product.jsx";

export function ProductList({ addToCart }) {
  const category = "laptops";
  const limit = 12;
  const apiURL = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description,stock`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // Novo estado para busca

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

  // Filtra produtos em tempo real
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          margin: "2rem 0",
          padding: "1rem",
          fontSize: "1.6rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          width: "60%",
          maxWidth: "400px",
        }}
      />
      <div className={styles.items}>
        {filteredProducts.map((product) => (
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
      {!loading && filteredProducts.length === 0 && (
        <p style={{ fontSize: "2rem", marginTop: "2rem" }}>
          Nenhum produto encontrado.
        </p>
      )}
    </div>
  );
}
