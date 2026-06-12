import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { productEnhancements } from "../../data/productEnhancements.js";
import { useProducts } from "../../hooks/useProducts.js";
import { useCart } from "../../stores/CartContext.jsx";
import styles from "./ProductListing.module.scss";

function getDefaultVariant() {
  return productEnhancements.variants.find((variant) => variant.stock > 0);
}

export function ProductListing() {
  const { addItem } = useCart();
  const { products, status, error, refetch } = useProducts();

  const handleQuickAdd = (product) => {
    const color = productEnhancements.colors[0];
    const variant = getDefaultVariant();

    addItem({
      availableStock: variant.stock,
      colorId: color.id,
      colorName: color.name,
      image: product.image,
      name: product.title,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: variant.size,
    });
  };

  if (status === "loading") {
    return (
      <section className={styles.listing} aria-label="Loading products">
        <div className={styles.headingSkeleton} />
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div className={styles.cardSkeleton} key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className={styles.errorPanel}>
        <p>We could not load products.</p>
        <span>{error}</span>
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className={styles.listing} aria-label="Products">
      <div className={styles.listingHeader}>
        <div>
          <p>Field-tested essentials</p>
          <h1>Shop Outdoor Gear</h1>
        </div>
        <span>{products.length} products</span>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <article className={styles.card} key={product.id}>
            <Link to={`/product/${product.id}`} aria-label={`View ${product.title}`}>
              <img src={product.image} alt={product.title} />
            </Link>
            <div className={styles.cardBody}>
              <Link className={styles.productName} to={`/product/${product.id}`}>
                {product.title}
              </Link>
              <div className={styles.cardMeta}>
                <strong>${product.price.toFixed(2)}</strong>
                <span>{product.category}</span>
              </div>
              <button type="button" onClick={() => handleQuickAdd(product)}>
                <ShoppingBag aria-hidden="true" size={18} />
                Quick Add
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
