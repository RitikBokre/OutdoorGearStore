import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../../stores/CartContext.jsx";
import styles from "./CartDrawer.module.scss";

export function CartDrawer() {
  const { cart, cartCount, cartTotal, isCartOpen, removeItem, setIsCartOpen } =
    useCart();

  return (
    <>
      <button
        className={styles.cartButton}
        type="button"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Open cart with ${cartCount} items`}
      >
        <ShoppingBag aria-hidden="true" size={20} />
        <span>{cartCount}</span>
      </button>

      {isCartOpen && (
        <div className={styles.overlay} role="presentation">
          <aside className={styles.drawer} aria-label="Cart">
            <div className={styles.drawerHeader}>
              <h2>Cart</h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className={styles.empty}>Your cart is empty.</p>
            ) : (
              <ul className={styles.items}>
                {cart.map((item) => (
                  <li key={item.key}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>
                        {item.colorName} / {item.size} / Qty {item.quantity}
                      </span>
                    </div>
                    <button type="button" onClick={() => removeItem(item.key)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.total}>
              <span>Total</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
