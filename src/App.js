import Dropdown from "./components/Dropdown";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-center">
        <h1>Pick Users</h1>

        <div className="dropdown">
          <Dropdown />
        </div>
      </header>
    </div>
  );
}

export default App;
