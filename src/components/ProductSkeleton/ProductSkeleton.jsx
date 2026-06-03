import styles from "./ProductSkeleton.module.scss";

export function ProductSkeleton() {
  return (
    <section className={styles.skeleton} aria-label="Loading product">
      <div className={styles.image} />
      <div className={styles.panel}>
        <span />
        <strong />
        <p />
        <p />
        <button type="button" disabled />
      </div>
    </section>
  );
}
