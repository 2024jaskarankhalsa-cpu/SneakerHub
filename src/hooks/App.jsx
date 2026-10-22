
import Dashboard from "../components/dashboard.jsx";
import Chat from "../components/chat.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { CartProvider } from "../context/CartContext.jsx";

export default function App() {
  const user = {
    name: "Student",
    role: "User",
  };

  return (
    <UserContext.Provider value={user}>
      <CartProvider>
        <Dashboard />
        <Chat />
      </CartProvider>
    </UserContext.Provider>
  );
}
