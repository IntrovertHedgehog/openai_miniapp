import styles from "../pages/index.module.css";

export default function Navigator() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
      <a href="/" className={styles.button}>Embbeding</a>
      <a href="/tree_index" className={styles.button}>Tree Index</a>
      <a href="/vector_store_index" className={styles.button}>Vector Store Index</a>
    </div>
  )
}
