import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import styles from "./ProductGallery.module.scss";

export function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useLocalStorage(
    "outdoor-gear-active-image",
    0,
  );
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (activeIndex > images.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, images.length, setActiveIndex]);

  const activeImage = images[activeIndex] ?? images[0];

  const updateZoomPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setZoomPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className={styles.gallery} aria-label={`${productName} images`}>
      <div
        className={styles.primaryImage}
        onMouseMove={updateZoomPosition}
        style={{
          "--zoom-image": `url(${activeImage.src})`,
          "--zoom-x": `${zoomPosition.x}%`,
          "--zoom-y": `${zoomPosition.y}%`,
        }}
      >
        <img src={activeImage.src} alt={activeImage.alt} />
      </div>

      <div className={styles.thumbnailRow} aria-label="Product thumbnails">
        {images.map((image, index) => (
          <button
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === activeIndex}
            className={index === activeIndex ? styles.activeThumbnail : ""}
            key={image.src}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <img src={image.src} alt="" />
          </button>
        ))}
      </div>

      <div className={styles.dots} aria-hidden="true">
        {images.map((image, index) => (
          <span
            className={index === activeIndex ? styles.activeDot : ""}
            key={image.src}
          />
        ))}
      </div>
    </section>
  );
}
