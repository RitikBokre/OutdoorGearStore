import { CartDrawer } from "./components/CartDrawer/CartDrawer.jsx";
import { ProductDetails } from "./components/ProductDetails/ProductDetails.jsx";
import { ProductGallery } from "./components/ProductGallery/ProductGallery.jsx";
import { ProductInfo } from "./components/ProductInfo/ProductInfo.jsx";
import { ProductSkeleton } from "./components/ProductSkeleton/ProductSkeleton.jsx";
import { useProduct } from "./hooks/useProduct.js";
import { useSelectedVariant } from "./hooks/useSelectedVariant.js";
import { productEnhancements } from "./data/productEnhancements.js";
import styles from "./App.module.scss";

export function App() {
  const { product, status, error, refetch } = useProduct(3);
  const variantState = useSelectedVariant(productEnhancements);

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <a className={styles.logo} href="/" aria-label="Ridge & Trail home">
          Ridge & Trail
        </a>
        <CartDrawer />
      </header>

      {status === "loading" && <ProductSkeleton />}

      {status === "error" && (
        <section className={styles.errorPanel}>
          <p>We could not load this product.</p>
          <span>{error}</span>
          <button type="button" onClick={refetch}>
            Retry
          </button>
        </section>
      )}

      {status === "success" && product && (
        <>
          <section className={styles.productGrid} aria-label="Product detail">
            <ProductGallery
              images={variantState.selectedColor.gallery}
              productName={product.title}
            />
            <ProductInfo
              product={product}
              enhancements={productEnhancements}
              variantState={variantState}
            />
          </section>
          <ProductDetails
            description={product.description}
            specs={productEnhancements.specs}
            reviews={productEnhancements.reviews}
          />
        </>
      )}
    </main>
  );
}
