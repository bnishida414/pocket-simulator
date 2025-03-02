import "./styles.css";
import { createRoot } from "react-dom/client";
import Counter from "./components/Counter";
import Board from "./components/Board";

function App() {
  return (
    <main>
      <Board />
    </main>
  );
}

createRoot(document.getElementById("app")!).render(<App />);
