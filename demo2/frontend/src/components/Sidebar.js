import React, { useEffect, useState } from "react";
import "../css/Sidebar.css";
import { logout } from "../requestToSpring";

const publicURL = process.env.PUBLIC_URL;

function Sidebar(props) {

  const [loginFlag, setLoginFlag] = useState(false);

  useEffect(() => {
    if(props.currentUserInfo.id != null) {
      setLoginFlag(true);
    } else {
      setLoginFlag(false);
    }
  })

  function callback(result) {
    if (result) {
      window.location = `/tree/${props.currentUserInfo._id}`; 

    }
  }
  function logoutFunc() {
    logout(callback);
  }

    return (
      <div id="overlay"
        onClick={(e) => {
          if(e.target.id === 'overlay'){
            props.setSidebarFlag(false);
          }
        }}
      >
        <div id="sidebar">
          <div className="close_icon">
            <a href="/"
              onClick={ (e) => {
                e.preventDefault();
                props.setSidebarFlag(false);
                
                return;
              }}
              >
              <img src={`${publicURL}/img/x_icon white.png`} alt="x_icon"/>
            </a>
          </div>
          
          <div className="sidebar_content">
            {loginFlag
            ?
            <>
              <div className="sidebar_nickname">
                {props.currentUserInfo.nickname}님
              </div>
              <div className="sidebar_id">
                {props.currentUserInfo.id}
              </div>
              <div className="sidebar_tree_show"
                onClick={(e) => {
                  window.location = "/"
                }}
              >
                내 트리 보러가기
              </div>
            </>
            :
            <>
              <div className="sidebar_title" onClick={(e) => {
                window.location = "/";
              }}>
                  내트리를 꾸며줘!
              </div>
              <div className="sidebar_join"
                onClick={(e) => {
                  window.location = "/join"
                }}
              >
                로그인/회원가입
              </div>
            </>
            }
            <div className="sidebar_more" onClick={(e) => {
              window.open("https://github.com/doyou1/spring-boot-react-exercise/tree/master/demo2");
            }}>
              개발자 이야기
            </div>
            {loginFlag
            ?
            <div className="sidebar_logout"
              onClick={logoutFunc}
              >
              로그아웃
            </div>
            :
            null
            }
            <div className="sidebar_info">
              문의 및 버그 제보 : tla149@daum.net
            </div>
          </div>
        </div>
      </div>
    );
}

export default Sidebar;