import { Minus, Plus, Truck } from "lucide-react";
import { useCart } from "../../stores/CartContext.jsx";
import styles from "./ProductInfo.module.scss";

export function ProductInfo({ product, enhancements, variantState }) {
  const { addItem } = useCart();
  const {
    quantity,
    selectedColor,
    selectedVariant,
    selection,
    setColor,
    setQuantity,
    setSize,
    sizeVariants,
  } = variantState;

  const isSoldOut = !selectedVariant || selectedVariant.stock === 0;
  const maxQuantity = Math.max(selectedVariant?.stock ?? 1, 1);

  const handleAddToCart = () => {
    if (isSoldOut) return;

    addItem({
      availableStock: selectedVariant.stock,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      image: selectedColor.gallery[0].src,
      name: product.title,
      price: enhancements.salePrice,
      productId: product.id,
      quantity,
      size: selection.size,
    });
  };

  return (
    <section className={styles.panel} aria-label="Product information">
      <p className={styles.brand}>{enhancements.brand}</p>
      <h1>{product.title}</h1>

      <div className={styles.priceRow}>
        <span className={styles.salePrice}>${enhancements.salePrice.toFixed(2)}</span>
        <span className={styles.compareAt}>
          ${enhancements.compareAtPrice.toFixed(2)}
        </span>
      </div>

      <div className={styles.optionGroup}>
        <div className={styles.optionHeader}>
          <span>Colour</span>
          <strong>{selectedColor.name}</strong>
        </div>
        <div className={styles.swatches}>
          {enhancements.colors.map((color) => (
            <button
              aria-label={color.name}
              aria-pressed={color.id === selection.colorId}
              className={color.id === selection.colorId ? styles.selectedSwatch : ""}
              key={color.id}
              onClick={() => setColor(color.id)}
              style={{ "--swatch": color.hex }}
              title={color.name}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className={styles.optionGroup}>
        <div className={styles.optionHeader}>
          <span>Size</span>
          <strong>{selection.size}</strong>
        </div>
        <div className={styles.sizes}>
          {sizeVariants.map(({ size, variant }) => {
            const stock = variant?.stock ?? 0;
            const soldOut = stock === 0;
            const lowStock = stock > 0 && stock <= 2;

            return (
              <button
                aria-pressed={size === selection.size}
                className={size === selection.size ? styles.selectedSize : ""}
                disabled={soldOut}
                key={size}
                onClick={() => setSize(size)}
                type="button"
              >
                <span>{size}</span>
                {soldOut && <small>Sold out</small>}
                {lowStock && <small>Only {stock} left</small>}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.quantityRow}>
        <span>Quantity</span>
        <div className={styles.stepper}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            type="button"
          >
            <Minus aria-hidden="true" size={16} />
          </button>
          <output aria-live="polite">{quantity}</output>
          <button
            aria-label="Increase quantity"
            disabled={quantity >= maxQuantity || isSoldOut}
            onClick={() =>
              setQuantity((current) => Math.min(maxQuantity, current + 1))
            }
            type="button"
          >
            <Plus aria-hidden="true" size={16} />
          </button>
        </div>
      </div>

      <button
        className={styles.addButton}
        disabled={isSoldOut}
        onClick={handleAddToCart}
        type="button"
      >
        {isSoldOut ? "Sold out" : "Add to Cart"}
      </button>

      {!isSoldOut && (
        <p className={styles.delivery}>
          <Truck aria-hidden="true" size={18} />
          {enhancements.delivery.available}
        </p>
      )}
    </section>
  );
}
