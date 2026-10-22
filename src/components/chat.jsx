
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("chatMessage", (data) => {
      setMessages((previous) => [...previous, data]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  function sendMessage(event) {
    event.preventDefault();

    if (!username.trim() || !message.trim() || !socketRef.current) {
      return;
    }

    socketRef.current.emit("chatMessage", {
      username: username.trim(),
      message: message.trim(),
    });

    setMessage("");
  }

  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "35px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        fontFamily: "Arial, sans-serif",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        SneakerHub Real-Time Chat
      </h2>

      <p
        style={{
          textAlign: "center",
          color: connected ? "green" : "red",
        }}
      >
        {connected ? "Connected" : "Connecting..."}
      </p>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        maxLength={40}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          minHeight: "180px",
          maxHeight: "300px",
          overflowY: "auto",
          padding: "12px",
          background: "#f5f5f5",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      >
        {messages.map((item, index) => (
          <p key={index} style={{ overflowWrap: "anywhere" }}>
            <strong>{item.username}:</strong> {item.message}
          </p>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={500}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={!connected || !username.trim() || !message.trim()}
          style={{
            padding: "10px 22px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </section>
  );
}
