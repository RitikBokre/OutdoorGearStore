import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { CartDrawer } from "./components/CartDrawer/CartDrawer.jsx";
import { ProductDetails } from "./components/ProductDetails/ProductDetails.jsx";
import { ProductGallery } from "./components/ProductGallery/ProductGallery.jsx";
import { ProductInfo } from "./components/ProductInfo/ProductInfo.jsx";
import { ProductListing } from "./components/ProductListing/ProductListing.jsx";
import { ProductSkeleton } from "./components/ProductSkeleton/ProductSkeleton.jsx";
import { useProduct } from "./hooks/useProduct.js";
import { useSelectedVariant } from "./hooks/useSelectedVariant.js";
import { productEnhancements } from "./data/productEnhancements.js";
import styles from "./App.module.scss";

export function App() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.logo} to="/" aria-label="Ridge & Trail home">
          Ridge & Trail
        </Link>
        <CartDrawer />
      </header>

      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

function ProductRoute() {
  const { id } = useParams();
  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    return <Navigate to="/" replace />;
  }

  return <ProductPage productId={productId} />;
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
