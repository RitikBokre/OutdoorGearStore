import { CartDrawer } from "./components/CartDrawer/CartDrawer.jsx";
import { NavLink } from "./components/NavLink/NavLink.jsx";
import { ProductDetails } from "./components/ProductDetails/ProductDetails.jsx";
import { ProductGallery } from "./components/ProductGallery/ProductGallery.jsx";
import { ProductInfo } from "./components/ProductInfo/ProductInfo.jsx";
import { ProductListing } from "./components/ProductListing/ProductListing.jsx";
import { ProductSkeleton } from "./components/ProductSkeleton/ProductSkeleton.jsx";
import { useProduct } from "./hooks/useProduct.js";
import { useRoute } from "./hooks/useRoute.js";
import { useSelectedVariant } from "./hooks/useSelectedVariant.js";
import { productEnhancements } from "./data/productEnhancements.js";
import styles from "./App.module.scss";

export function App() {
  const route = useRoute();

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <NavLink className={styles.logo} to="/" aria-label="Ridge & Trail home">
          Ridge & Trail
        </NavLink>
        <CartDrawer />
      </header>

      {route.name === "listing" && <ProductListing />}

      {route.name === "product" && <ProductPage productId={route.params.id} />}
    </main>
  );
}

function ProductPage({ productId }) {
  const { product, status, error, refetch } = useProduct(productId);
  const variantState = useSelectedVariant(productEnhancements);

  if (status === "loading") {
    return <ProductSkeleton />;
  }

  if (status === "error" || !product) {
    return (
      <section className={styles.errorPanel}>
        <p>We could not load this product.</p>
        <span>{error || "Product was not found."}</span>
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </section>
    );
  }

  return (
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
  );
}
