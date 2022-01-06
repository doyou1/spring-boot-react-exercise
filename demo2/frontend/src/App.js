import React, { useState, useEffect } from 'react';
import {Routes, Route, useParams} from "react-router-dom";

import "./css/App.css";
import TopContainer from './components/TopContainer';
import TreeContainer from './components/TreeContainer';
import ButtonContainer from './components/ButtonContainer';
import Sidebar from './components/Sidebar';
import JoinContainer from './components/JoinContainer';
import SendContainer from './components/SendContainer';
import {getMessage, treeLink, currentUser} from './requestToSpring';

// const publicURL = process.env.PUBLIC_URL;

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/send/:_id" element={<Send />} />
        <Route path="/tree/:_id" element={<Main mainPageType="treelink" />} />
      </Routes>
    </div>
  );
}

function Main(props) {
  
  const [mainPageType, setMainPageType] = useState("init");
  const [sidebarFlag, setSidebarFlag] = useState(false);

  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [viewUserInfo, setViewUserInfo] = useState({});
  const [messages, setMessages] = useState([]);

  const params = useParams();

  useEffect(() => {    
    currentUser()
    .then((currentUserInfo_) => {
      // init
      if (currentUserInfo_._id === null && props.mainPageType === undefined) {
        setMainPageType('init');
        return;
      } else {  // host, treelink
        setCurrentUserInfo(currentUserInfo_);
      
        if (props.mainPageType === undefined) {
          setMainPageType('host');
          setViewUserInfo(currentUserInfo_);
          return getMessage(currentUserInfo_._id);
        }
        else if (props.mainPageType === 'treelink') {
          setMainPageType('treelink');
          treeLink(params._id)
          .then((viewUserInfo_) => {
            if (viewUserInfo_.id === null) return;
            else {
              setViewUserInfo(viewUserInfo_);
              return getMessage(viewUserInfo_._id);
            }
          })
          .then((messages) => {
            if(messages === undefined) return;
            setMessages(messages);
          });
        }
      }
    })
    .then((messages) => {
      if(messages === undefined) return;
      setMessages(messages);
    })
  }, []);

  function onButtonClick() {
    switch (mainPageType) {
      case "init":
        // 시작하기
        window.location = `/join`;
        break;
      case "host":
        // 트리 링크 복사하기
        navigator.clipboard.writeText(`localhost:3000/tree/${currentUserInfo._id}`);
    
        document.querySelector('#click_event_div').classList.add('active');
        setTimeout(function() {
          document.querySelector('#click_event_div').classList.remove('active');
        }, 3000);
        break;
      case "treelink":
        // 트리 꾸며주기
        window.location = `/send/${viewUserInfo._id}`;
        break;
      default :
        break;
    }
  }

  return (
      <div id="wrap_main">
        {sidebarFlag 
        ? <Sidebar 
          mainPageType={mainPageType}
          currentUserInfo={currentUserInfo}
          setSidebarFlag={setSidebarFlag}
          />
        : null}
          <TopContainer
            mainPageType={mainPageType}
            viewUserInfo={viewUserInfo}
            messages={messages}
            setSidebarFlag={setSidebarFlag}
          />
          <TreeContainer 
            messages={messages}
            mainPageType={mainPageType}
          />      
          <ButtonContainer 
            mainPageType={mainPageType}
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
  const [currentUserInfo, setCurrentUserInfo] = useState({});

  const params = useParams();

  useEffect(() => {

    currentUser()
    .then((currentUserInfo_) => {
      if (currentUserInfo_._id === null) return;
      else setCurrentUserInfo(currentUserInfo_);
    });
    
  }, []);


  return (
    <div id="wrap_send">
      <SendContainer currentUserInfo={currentUserInfo} receiver_id={params._id}/>
    </div>
  );
}

export default App;