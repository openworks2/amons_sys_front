
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import M_LoginPage from "./pages/M_LoginPage";
import { Route } from "react-router";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import M_HomePage from "./pages/M_HomePage";

import HomePage from "./pages/HomePage";

import styled from "styled-components";


const GlobalStyle = styled.div`
.ui.modal.transition.visible.active.confirm-modal{
      width : 500px;
      height: auto;
      text-align: center;
      align-items: center;
      top : 30%;
      left : 40%;
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
        &.beacon{
          font-family: "RobotoMono-Medium";
        }
      }
      .text-info{
        font-family: "NotoSansKR-Medium";
        font-size : 15px;
        color : #f1592a !important;
      }
}
.ui.modal.transition.visible.active.address-modal{
      width : 600px;
      height: 40.5em;
      text-align: center;
      align-items: center;
      top : 20%;
      left : 35%;
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
    <GlobalStyle className="App">
      <Route path="/" component={MainPage} exact />
      <Route path="/amons/signin" component={LoginPage} />
      <Route path="/amons/m.signin" component={M_LoginPage} />
      <Route path="/amons/m.home" component={M_HomePage} />
      <Route path="/amons/home" component={HomePage} />
    </GlobalStyle>
  );
}

export default App;
