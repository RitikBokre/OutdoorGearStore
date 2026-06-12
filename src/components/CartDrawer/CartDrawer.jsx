import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../../stores/CartContext.jsx";
import styles from "./CartDrawer.module.scss";

export function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    removeItem,
    setIsCartOpen,
    updateQuantity,
  } = useCart();

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
                    <img src={item.image} alt="" />
                    <div className={styles.itemContent}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>
                          {item.colorName} / {item.size}
                        </span>
                        <small>${item.price.toFixed(2)} each</small>
                      </div>
                      <div className={styles.itemActions}>
                        <div className={styles.stepper}>
                          <button
                            aria-label={`Decrease quantity for ${item.name}`}
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.key, item.quantity - 1)
                            }
                            type="button"
                          >
                            <Minus aria-hidden="true" size={14} />
                          </button>
                          <output aria-live="polite">{item.quantity}</output>
                          <button
                            aria-label={`Increase quantity for ${item.name}`}
                            disabled={item.quantity >= item.availableStock}
                            onClick={() =>
                              updateQuantity(item.key, item.quantity + 1)
                            }
                            type="button"
                          >
                            <Plus aria-hidden="true" size={14} />
                          </button>
                        </div>
                        <button
                          className={styles.removeButton}
                          type="button"
                          onClick={() => removeItem(item.key)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.summary}>
              <div>
                <span>Subtotal</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <div>
                <span>Grand total</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
