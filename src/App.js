import { Route } from "react-router";
import MainPage from "./pages/MainPage";

import './App.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={MainPage} exact />
      <Route path="/signin" component={LoginPage} />
      <Route path="/home" component={HomePage} />
    </div>
  );
}

export default App;
