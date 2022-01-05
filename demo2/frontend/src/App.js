import React, { useState, useEffect } from 'react';
import {Routes, Route, useParams} from "react-router-dom";

import "./css/App.css";
import TopContainer from './components/TopContainer';
import TreeContainer from './components/TreeContainer';
import ButtonContainer from './components/ButtonContainer';
import Sidebar from './components/Sidebar';
import JoinContainer from './components/JoinContainer';
import SendContainer from './components/SendContainer';
import {currentUser, treeLink} from './requestToSpring';

// const publicURL = process.env.PUBLIC_URL;

function App() {

  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [mainPageType, setMainPageType] = useState("init");

  function callback(data)  {
    if(data.id === null) {
      setMainPageType("init");
    } else {
      setMainPageType("host");
      setCurrentUserInfo(data);
    }
  }

  useEffect(
    () => {
      currentUser(callback);
    }, []
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main mainPageType={mainPageType} currentUserInfo={currentUserInfo}/>} />
        <Route path="/join" element={<Join />} />
        <Route path="/send" element={<Send />} />
        <Route path="/:_id/tree" element={<TreeLink currentUserInfo={currentUserInfo}/>} />
      </Routes>
    </div>
  );
}

function Main(props) {
  const [sidebarFlag, setSidebarFlag] = useState(false);
  
  function onButtonClick() {
    if(props.mainPageType === "init") {
      window.location = "/join";
    } else if(props.mainPageType === "host") {
      navigator.clipboard.writeText(`localhost:3000/${props.currentUserInfo._id}/tree`);
    
      document.querySelector('#click_event_div').classList.add('active');
      setTimeout(function() {
        document.querySelector('#click_event_div').classList.remove('active');
      }, 3000);
  
    } else if(props.mainPageType === "treelink") {
      alert("treelink");
    }
  }

  return (
      <div id="wrap_main">
        {sidebarFlag 
        ? <Sidebar 
          mainPageType={props.mainPageType}
          currentUserInfo={props.currentUserInfo}
          setSidebarFlag={setSidebarFlag}
          />
        : null}
          <TopContainer
            mainPageType={props.mainPageType}
            currentUserInfo={props.currentUserInfo}
            linkUserInfo={props.linkUserInfo}
            setSidebarFlag={setSidebarFlag}
          />
          <TreeContainer 
            currentUserInfo={props.currentUserInfo}
            linkUserInfo={props.linkUserInfo}
            mainPageType={props.mainPageType}
          />
          <ButtonContainer 
            onButtonClick={onButtonClick}
            mainPageType={props.mainPageType}
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

function TreeLink(props) {
  const params = useParams();
  const [linkUserInfo, setLinkUserInfo] = useState({});

  function callback(data)  {
    if(data.id !== null) {
      setLinkUserInfo(data);
    }
  }

  useEffect(() => {
    treeLink(params._id, callback);
  }, []);

  return (
    <Main 
        currentUserInfo={props.currentUserInfo}
        linkUserInfo={linkUserInfo}
        mainPageType="treelink"
      />
  );
}

export default App;