import React, { useState, useEffect } from 'react';
import {Routes, Route, useParams} from "react-router-dom";

import "./css/App.css";
import TopContainer from './components/TopContainer';
import TreeContainer from './components/TreeContainer';
import ButtonContainer from './components/ButtonContainer';
import Sidebar from './components/Sidebar';
import JoinContainer from './components/JoinContainer';
import SendContainer from './components/SendContainer';
import {currentUser, getMessage, treeLink} from './requestToSpring';

// const publicURL = process.env.PUBLIC_URL;

function App() {

  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [hostMessages, setHostMessages] = useState([]);
  const [mainPageType, setMainPageType] = useState("init");

  function callback(data)  {
    if(data.id === null) {
      setMainPageType("init");
    } else {
      setMainPageType("host");
      setCurrentUserInfo(data);
      getMessage(data._id, getMessageCallback); // % 주의 callback hello %
    }
  }

  function getMessageCallback(data)  {
    setHostMessages(data);
  }

  useEffect(
    () => {
      currentUser(callback);
    }, []
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main mainPageType={mainPageType} hostMessages={hostMessages} currentUserInfo={currentUserInfo}/>} />
        <Route path="/join" element={<Join />} />
        <Route path="/send/:_id" element={<Send currentUserInfo={currentUserInfo} />} />
        <Route path="/tree/:_id" element={<TreeLink currentUserInfo={currentUserInfo}/>} />
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
      navigator.clipboard.writeText(`localhost:3000/tree/${props.currentUserInfo._id}`);
    
      document.querySelector('#click_event_div').classList.add('active');
      setTimeout(function() {
        document.querySelector('#click_event_div').classList.remove('active');
      }, 3000);
    } else if(props.mainPageType === "treelink") {
      window.location =`/send/${props.linkUserInfo._id}`;
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
            hostMessages={props.hostMessages}
            linkUserInfo={props.linkUserInfo}
            linkMessages={props.linkMessages}
            setSidebarFlag={setSidebarFlag}
          />
          <TreeContainer 
            currentUserInfo={props.currentUserInfo}
            hostMessages={props.hostMessages}
            linkUserInfo={props.linkUserInfo}
            linkMessages={props.linkMessages}
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

function Send(props) {

  const params = useParams();

  return (
    <div id="wrap_send">
      <SendContainer currentUserInfo={props.currentUserInfo} receiver_id={params._id}/>
    </div>
  );
}

function TreeLink(props) {
  const params = useParams();
  const [linkUserInfo, setLinkUserInfo] = useState({});
  const [linkMessages, setLinkMessages] = useState([]);

  function treeLinkCallback(data)  {
    if(data.id !== null) {
      setLinkUserInfo(data);
    }
  }

  function getMessageCallback(data)  {
    setLinkMessages(data);
  }


  useEffect(() => {
    treeLink(params._id, treeLinkCallback);
    getMessage(params._id, getMessageCallback);
  }, []);

  return (
    <Main
        currentUserInfo={props.currentUserInfo}
        linkUserInfo={linkUserInfo}
        linkMessages={linkMessages}
        mainPageType="treelink"
      />
  );
}

export default App;