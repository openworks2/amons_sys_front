import { Route } from "react-router";

import "./App.css";
import "semantic-ui-css/semantic.min.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={MainPage} exact />
      <Route path="/amons/signin" component={LoginPage} />
      <Route path="/amons/home" component={HomePage} />
    </div>
  );
}

export default App;
