import React, { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";

import "./css/App.css";
import TopContainer from './components/TopContainer';
import TreeContainer from './components/TreeContainer';
import ButtonContainer from './components/ButtonContainer';
import Sidebar from './components/Sidebar';
import JoinContainer from './components/JoinContainer';
import SendContainer from './components/SendContainer';
import {currentUser} from './requestToSpring';

// const publicURL = process.env.PUBLIC_URL;

function App() {

  const [userInfo, setUserInfo] = useState({});
  const [mainPageType, setMainPageType] = useState("init");

  function callback(data)  {
    if(data.id === null) {
      setMainPageType("init");
    } else {
      setMainPageType("done");
      setUserInfo(data);
    }
  }

  useEffect(
    () => {
      currentUser("/currentUser", callback);
    }, []
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main mainPageType={mainPageType} userInfo={userInfo}/>} />
        <Route path="/join" element={<Join />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </div>
  );
}

function Main(props) {
  const [sidebarFlag, setSidebarFlag] = useState(false);
  const [buttonText, setButtonText] = useState("시작하기");
  const [treeItemFlag, setTreeItemFlag] = useState(false);
  const [topBarFlag, setTopBarFlag] = useState(false);
  

  useEffect(() => {
    checkPageType();
  });

  function checkPageType() {
    switch (props.mainPageType) {
      case "init":
        setButtonText("시작하기");
        setTreeItemFlag(false);
        setTopBarFlag(false);
        break;
      case "done":
        setButtonText("트리 링크 복사하기");
        setTreeItemFlag(true);
        setTopBarFlag(true);  
        break;

      default :
        break;
    }
  }
  
  function onButtonClick() {
    if(props.mainPageType === "init") {
      window.location = "join";
    } else if(props.mainPageType === "done") {
      console.log("done")
    }
  }

  return (
      <div id="wrap_main">
        {sidebarFlag 
        ? <Sidebar 
          setSidebarFlag={setSidebarFlag} 
          userInfo={props.userInfo}
          />
        : null}
          <TopContainer
            setSidebarFlag={setSidebarFlag}
            topBarFlag={topBarFlag}
            userInfo={props.userInfo}
          />
          <TreeContainer 
            treeItemFlag={treeItemFlag}
          />
          <ButtonContainer 
            buttonText={buttonText}
            onButtonClick={onButtonClick}
          />
      </div>
  );
}

function Join() {

  return (
    <div id="wrap_join">
      <JoinContainer/>
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