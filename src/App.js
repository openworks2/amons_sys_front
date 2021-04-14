import { Route } from "react-router";

import "./App.css";
import "semantic-ui-css/semantic.min.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MonitorPage from "./pages/MonitorPage";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.ui.modal.transition.visible.active.confirm-modal{
      width : 500px;
      height: 24.5em;
      text-align: center;
      align-items: center;

      .delete-icon{
        font-size : 100px;
        color : #d01919;
        margin : 20px;
      }

      .warning-icon{
        font-size : 100px;
        color : #5e7827;
        margin : 20px;
      }
      .text{
        font-family: "NotoSansKR-Medium";
        font-size : 20px;
      }
}
`;

function App() {
  return (
    <>
      <GlobalStyle className="App"></GlobalStyle>
      <Route path="/" component={MainPage} exact />
      <Route path="/amons/signin" component={LoginPage} />
      <Route path="/amons/home" component={HomePage} />
      {/* <Route path="/amons/monitor" component={MonitorPage} /> */}
    </>
  );
}

export default App;
