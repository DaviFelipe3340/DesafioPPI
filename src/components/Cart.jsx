import styles from "./Cart.module.css";
import { ArrowBigRightDash, Trash2, Plus, Minus } from "lucide-react";

export default function Cart({ cart, onQuantityChange, onRemove }) {
  // Calcula total do carrinho
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <>
      <h2>Shopping Cart</h2>
      <div className={styles.cartLayout}>
        <div className={styles.container}>
          {cart.length === 0 ? (
            <p className={styles.empty}>Seu Carrinho está vazio! ;~;</p>
          ) : (
            <>
              <div className={styles.track}>
                <h3>
                  Carrinho <ArrowBigRightDash /> Endereço <ArrowBigRightDash />Entrega <ArrowBigRightDash /> Pagamento <ArrowBigRightDash /> Confirmação <ArrowBigRightDash /> Concluir
                </h3>
              </div>
              <ul className={styles.cart}>
                {cart.map((product, index) => (
                  <li key={index}>
                    <div className={styles.product}>
                      <img className={styles.image} src={product.thumbnail} alt={product.title} />
                      <h3 className={styles.title}>{product.title}</h3>
                      <p className={styles.price}>${product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className={styles.h3qtd}>Quantidade:</h3>
                      <div className={styles.quantity}>
                        <button onClick={() => onQuantityChange(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>
                          <Minus size={20} />
                        </button>
                        <span>{product.quantity}</span>
                        <button onClick={() => onQuantityChange(product.id, product.quantity + 1)}>
                          <Plus size={20} />
                        </button>
                        <button onClick={() => onRemove(product.id)} className={styles.removeBtn}>
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={styles.summary}>
          <h3 className={styles.resume}>Resumo do Pedido</h3>
          <p className={styles.pricetotal}>Valor total: <strong>R${total.toFixed(2)}</strong></p>
          <p className={styles.freeShipping}>Frete grátis!</p>
        </div>
      </div>
    </>
  );
}