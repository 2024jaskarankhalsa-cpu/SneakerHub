
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import Product from "./product.jsx";
import Cart from "./cart.jsx";

export default function Dashboard() {
  const user = useContext(UserContext);
  const [count, setCount] = useState(0);

  useDocumentTitle(`SneakerHub Dashboard - ${count}`);

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* Experiment 2 */}
        <section style={styles.experimentCard}>
          <p style={styles.eyebrow}>SNEAKERHUB • EXPERIMENT 02</p>

          <h1 style={styles.heading}>
            React <span style={styles.orange}>Hooks</span>
          </h1>

          <p style={styles.subtitle}>
            Interactive Dashboard
          </p>

          <div style={styles.userCard}>
            <div style={styles.avatar}>SH</div>
            <div>
              <p style={styles.welcome}>Welcome back,</p>
              <h2 style={styles.userName}>{user.name}</h2>
              <span style={styles.role}>{user.role}</span>
            </div>
          </div>

          <div style={styles.counterCard}>
            <p style={styles.counterLabel}>YOUR COUNTER</p>
            <div style={styles.counter}>{count}</div>
            <p style={styles.counterHint}>
              Click below to increase your count
            </p>

            <button
              onClick={() => setCount((previous) => previous + 1)}
              style={styles.button}
            >
              + Increase Count
            </button>
          </div>
        </section>

        {/* Experiment 3 */}
        <section style={styles.shoppingSection}>
          <div style={styles.sectionHeading}>
            <p style={styles.eyebrow}>SNEAKERHUB COLLECTION</p>
            <h2 style={styles.title}>
              Shopping <span style={styles.orange}>Experience</span>
            </h2>
            <p style={styles.subtitle}>
              Explore products and manage your shopping cart.
            </p>
          </div>

          <div style={styles.productWrapper}>
            <Product />
          </div>

          <Cart />
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    boxSizing: "border-box",
    background: "#101010",
    color: "#f5f5f5",
    padding: "48px 24px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  experimentCard: {
    width: "100%",
    maxWidth: "760px",
    boxSizing: "border-box",
    margin: "0 auto 48px",
    padding: "36px 24px",
    textAlign: "center",
    background: "#191919",
    border: "1px solid #333333",
    borderRadius: "18px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
  },

  eyebrow: {
    color: "#ff7000",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: "0 0 14px",
  },

  heading: {
    fontSize: "clamp(28px, 5vw, 42px)",
    margin: "0 0 10px",
    fontWeight: "800",
  },

  orange: {
    color: "#ff7000",
  },

  subtitle: {
    color: "#aaaaaa",
    fontSize: "15px",
    lineHeight: 1.6,
  },

  userCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
    margin: "30px auto",
    padding: "20px",
    maxWidth: "340px",
    background: "#222222",
    border: "1px solid #393939",
    borderRadius: "12px",
  },

  avatar: {
    width: "58px",
    height: "58px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background: "#ff7000",
    color: "#111111",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "20px",
  },

  welcome: {
    color: "#aaaaaa",
    margin: "0 0 5px",
    fontSize: "13px",
  },

  userName: {
    margin: "0 0 8px",
    fontSize: "21px",
  },

  role: {
    display: "inline-block",
    padding: "5px 10px",
    color: "#ff7000",
    background: "#302216",
    borderRadius: "20px",
    fontSize: "12px",
  },

  counterCard: {
    maxWidth: "340px",
    margin: "0 auto",
    padding: "24px",
    background: "#111111",
    border: "1px solid #393939",
    borderRadius: "14px",
  },

  counterLabel: {
    color: "#aaaaaa",
    fontSize: "12px",
    letterSpacing: "1.5px",
    margin: "0",
  },

  counter: {
    color: "#ff7000",
    fontSize: "60px",
    fontWeight: "bold",
    margin: "12px 0",
  },

  counterHint: {
    color: "#999999",
    fontSize: "13px",
    marginBottom: "22px",
  },

  button: {
    width: "100%",
    padding: "13px 18px",
    background: "#ff7000",
    color: "#111111",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  shoppingSection: {
    width: "100%",
    textAlign: "center",
  },

  sectionHeading: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "clamp(24px, 4vw, 32px)",
    margin: "0 0 10px",
  },

  productWrapper: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "left",
  },
};
