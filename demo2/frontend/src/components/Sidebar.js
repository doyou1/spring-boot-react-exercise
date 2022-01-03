import React, {useState} from "react";
import "../css/Sidebar.css";

const publicURL = process.env.PUBLIC_URL;

function Sidebar(props) {

    return (
      <div id="overlay"
        onClick={(e) => {
          if(e.target.id == 'overlay'){
            props.setSidebarFlag(false);
          }
        }}
      >
        <div id="sidebar">
          <div className="close_icon">
            <a href="#"
              onClick={ (e) => {
                e.preventDefault();
                props.setSidebarFlag(false);
              }}
              >
              <img src={`${publicURL}/img/x_icon white.png`}/>
            </a>
          </div>
          
          <div className="sidebar_content">
            <div className="sidebar_title">
                내트리를 꾸며줘!
            </div>
            <div className="sidebar_join"
              onClick={(e) => {
                window.location = "join"
              }}
            >
              로그인/회원가입
            </div>
            <div className="sidebar_more">
              개발자 이야기
            </div>
            <div className="sidebar_info">
              문의 및 버그 제보 : tla149@daum.net
            </div>
          </div>
        </div>
      </div>
    );
}

export default Sidebar;