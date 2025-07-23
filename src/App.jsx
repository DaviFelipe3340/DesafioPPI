import { ProductList } from "./components/ProductList";
import { useState } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Routes, Route } from "react-router";

export default function App() {
  const [cart, setCart] = useState([]);

  // Adiciona ao carrinho ou aumenta a quantidade se já existe
  function addToCart(product) {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  // Altera a quantidade de um produto
  function handleQuantityChange(id, newQuantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  }

  // Remove um produto do carrinho
  function handleRemove(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route
          path="/Cart"
          element={
            <Cart
              cart={cart}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          }
        />
      </Routes>
    </>
  );
}
