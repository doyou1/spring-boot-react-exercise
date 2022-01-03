import React, { useState, useEffect } from 'react';
import customAxis from './customAxios';
import {Routes, Route, Link} from "react-router-dom";

import "./css/App.css";
import TopContainer from './components/TopContainer';
import TreeContainer from './components/TreeContainer';
import ButtonContainer from './components/ButtonContainer';
import Sidebar from './components/Sidebar';
import JoinContainer from './components/JoinContainer';
import SendContainer from './components/SendContainer';
// import from "react-router_dom";


const publicURL = process.env.PUBLIC_URL;

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </div>
  );
}

function Main() {
  
  const [sidebarFlag, setSidebarFlag] = useState(false);

  function onClick() {
    window.location = "send";
  }

  return (
      <div id="wrap_main">
        {sidebarFlag 
        ? <Sidebar setSidebarFlag={setSidebarFlag} />
        : null}
          <TopContainer 
            setSidebarFlag={setSidebarFlag}
          />
          <TreeContainer />
          <ButtonContainer 
            buttonText="트리 꾸며주기"
            onClick={onClick}
          />
      </div>
  );
}

function Join() {

  return (
    <div id="wrap_join">
      <JoinContainer />
    </div>
  );
}

function Send() {

  return (
    <div id="wrap_send">
      <SendContainer />
    </div>
  );
}

export default App;