import { Star } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import styles from "./ProductDetails.module.scss";

const tabs = ["Description", "Specifications", "Reviews"];

export function ProductDetails({ description, specs, reviews }) {
  const [activeTab, setActiveTab] = useLocalStorage(
    "outdoor-gear-details-tab",
    tabs[0],
  );

  return (
    <section className={styles.details} aria-label="Product details">
      <div className={styles.tabList} role="tablist" aria-label="Product detail tabs">
        {tabs.map((tab) => (
          <button
            aria-controls={`panel-${tab}`}
            aria-selected={activeTab === tab}
            id={`tab-${tab}`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className={styles.panel}
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === "Description" && (
          <div className={styles.copy}>
            <h2>Built for fast-changing days outside</h2>
            <p>{description}</p>
            <p>
              We positioned this PDP as a premium shell layer with practical
              merchandising details layered over the Fake Store API record.
            </p>
          </div>
        )}

        {activeTab === "Specifications" && (
          <dl className={styles.specs}>
            {Object.entries(specs).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {activeTab === "Reviews" && (
          <div className={styles.reviews}>
            {reviews.map((review) => (
              <article key={review.author}>
                <div className={styles.stars} aria-label={`${review.rating} stars`}>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star aria-hidden="true" fill="currentColor" key={index} size={16} />
                  ))}
                </div>
                <h3>{review.title}</h3>
                <p>{review.body}</p>
                <strong>{review.author}</strong>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
