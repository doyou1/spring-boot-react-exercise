import React, { useState, useEffect } from 'react';
import customAxis from './customAxios';
import './css/App.css';

function App() {
  const [sidebarFlag, setSidebarFlag] = useState(false);
  
  return (
    <div className="App">
      <div id="wrap">
        {sidebarFlag 
        ? 
          <div>
            <Sidebar 
              setSidebarFlag={setSidebarFlag}
              />
            <TopContainer 
              setSidebarFlag={setSidebarFlag}
            />
            <TreeContainer />
            <ButtonContainer />
          </div>
        :
          <>
            <TopContainer 
              setSidebarFlag={setSidebarFlag}
            />
            <TreeContainer />
            <ButtonContainer />
          </>
        }
        </div>
      </div>
  );
}

function TopContainer(props) {

  const [userName, setUserName] = useState("Chu")
  const [msgCount, setMsgCount] = useState(8);
  const [readableDate, setReadableDate] = useState(25);
  
  return (
    <div>
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
              <img src={require('./img/menu_icon.png')}/>
            </a>
          </div>
        </div>
        <div><span className="top_msgCount">{msgCount}</span>개의 메세지가 전달됐어요!</div> 
      </div>
      <div className='top_info'>
        <div>받은 메세지는 <span className='top_readableDate'>{readableDate}</span>일에 확인할 수 있어요</div>  
      </div>
    </div>
  );
}

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
            <img src={require('./img/x_icon white.png')}/>
          </a>
        </div>
        
        <div className="sidebar_content">
          <div className="sidebar_title">
              내트리를 꾸며줘!
          </div>
          <div className="sidebar_join">
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

function TreeContainer() {
  const [msgSender, setMsgSender] = useState('');
  const [imgIdx, setImgIdx] = useState(1);


  const showModal = () => {
    window.location = "#modal"
  }

  const closeModal = () => {
    window.location = "#"
  }

  return (
    <div>
      <div id="tree_container">
        <img id="tree_img" src={require("./img/christmas_tree_image.png")} />
        <TreeItem 
          showModal={function(sender, index) {
            showModal()
            setMsgSender(sender);
            setImgIdx(index);
          }.bind(this)}
        />
        <PageIndicator />
        <MessageModal
          messageSender={msgSender}
          imageIndex={imgIdx}
          closeModal={function() {
            closeModal()
          }.bind(this)}
        />
      </div>
    </div>
  );
}

function TreeItem(props) {
  const treeColCounts = [1, 3, 4];
  const itemSenders = [ "blank", "JH", "Chu", "IU", "Hyun"];
  const rand_1_4 = () => {
    return Math.floor(Math.random() * 4) + 1;
  }

  const makeTreeItem = () => {
    const result = [];
    for (let i = 0; i < treeColCounts.length; i++) {
      const colCount = treeColCounts[i];
      const cols = [];

      for (let j = 0; j < colCount; j++) {
        const itemSender = itemSenders[rand_1_4()];
        const imageIndex = rand_1_4();  

        cols.push(
          <div className="tree_item_col" onClick={() => props.showModal(itemSender, imageIndex)}>
            <div className="tree_item_sender">
              {itemSender}
            </div>
            <div>
              <img src={require(`./img/tree_item/item${imageIndex}.png`)} />
            </div>
          </div>
        )
      }
      result.push(<div className={`tree_item_row${i+1}`}> {cols} </div>);
    }

    return result
  }

  return (
    <div className="tree_item_container">
      {makeTreeItem()}
    </div>
  );
}

function MessageModal(props) {
  
  return (
    <div id="modal" className='modalDialog'>
      <div>
        <a href="#" title="Delete" className='delete'>지우기</a>
        <div>
          {props.messageSender}
          <img src={require(`./img/tree_item/item${props.imageIndex}.png`)} />
        </div>
        <div id="modal_close_container" onClick={() => props.closeModal()}>
          <div className="modal_close_text">
          닫기
          </div>
        </div>
      </div>
    </div>
  );
}

function PageIndicator() {

  const arrowNames = ["page_indicator_left", "page_indicator_right"]
  
  const makeLeftArrow = () => {
    if(flag()) {
      return (
        <div className="page_indicator_item able">
          <a href="#">&lt;&lt;</a>
        </div>
      );
    } else {
      return (
        <div className="page_indicator_item disable">
          <a href="#">&lt;&lt;</a>
        </div>
      );
    }
  }

  const makeRightArrow = () => {
    if(flag()) {
      return (
        <div className="page_indicator_item able">
          <a href="#">&gt;&gt;</a>
        </div>
      );
    } else {
      return (
        <div className="page_indicator_item disable">
          <a href="#">&gt;&gt;</a>
        </div>
      );
    }
  }

  const flag = () => {
    return Math.random() < 0.5 ? true : false;
  }


  return (
    <div id="page_indicator_container">
      {makeLeftArrow()}
      <div className="page_indicator_item page_indicator_text">
        1/2
      </div>
      {makeRightArrow()}      
    </div>
  );
}

function ButtonContainer() {

  return (
    <div id="button_container">
      <div className="button_text">
      트리 꾸며주기
      </div>
    </div>
  );
}

export default App;