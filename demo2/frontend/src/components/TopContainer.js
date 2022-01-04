import React, {useState} from "react";
import "../css/TopContainer.css";

const publicURL = process.env.PUBLIC_URL;

function TopContainer(props) {

    const [userName, setUserName] = useState("Chu")
    const [msgCount, setMsgCount] = useState(8);
    const [readableDate, setReadableDate] = useState(25);
    
    return (
      <div>
        {props.topBarFlag
        ?
        <>
        <div className='top_title'>
          <div className='top_title_row'>
            <div><span className="top_username">{userName}</span>님에게</div>
            <div>
              <a href="#"
                onClick={ (e) => {
                  e.preventDefault();
                  props.setSidebarFlag(true);
                }}
                >
                <img 
                  src={`${publicURL}/img/menu_icon.png`}
                  alt="menu_icon"
                />
              </a>
            </div>
          </div>
          <div><span className="top_msgCount">{msgCount}</span>개의 메세지가 전달됐어요!</div> 
        </div>
        <div className='top_info'>
          <div>받은 메세지는 <span className='top_readableDate'>{readableDate}</span>일에 확인할 수 있어요</div>  
        </div>
        </>
        :
        <div className='top_title init'>
          내 트리를 꾸며줘!
        </div>
        }
      </div>
    );
}

export default TopContainer;