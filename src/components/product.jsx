
import { useCart } from "../context/CartContext.jsx";

export default function Product() {
  const { addItem } = useCart();

  const sneaker = {
    id: 1,
    name: "Air Runner",
    price: 2999,
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Featured Sneaker</h2>

      <div style={styles.card}>
        <div style={styles.icon}>👟</div>

        <p style={styles.tag}>SNEAKERHUB EXCLUSIVE</p>

        <h3 style={styles.name}>{sneaker.name}</h3>

        <p style={styles.price}>
          ₹{sneaker.price.toLocaleString("en-IN")}
        </p>

        <button
          style={styles.button}
          onClick={() => addItem(sneaker)}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: "100%",
    maxWidth: "1000px",
    margin: "30px auto",
    color: "#ffffff",
    boxSizing: "border-box",
  },
  heading: {
    color: "#ff7000",
    fontSize: "24px",
    marginBottom: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "320px",
    boxSizing: "border-box",
    padding: "28px",
    background: "#1b1b1b",
    border: "1px solid #393939",
    borderRadius: "14px",
    textAlign: "center",
  },
  icon: {
    fontSize: "60px",
    marginBottom: "12px",
  },
  tag: {
    color: "#ff7000",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1.5px",
  },
  name: {
    fontSize: "22px",
    margin: "14px 0",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "22px",
  },
  button: {
    width: "100%",
    padding: "12px 16px",
    background: "#ff7000",
    color: "#111111",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
};
