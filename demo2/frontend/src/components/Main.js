import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from './Sidebar';
import TopContainer from './TopContainer';
import TreeContainer from './TreeContainer';
import ButtonContainer from './ButtonContainer';

import {getMessage, treeLink, currentUser} from '../requestToSpring';


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

  export default Main;