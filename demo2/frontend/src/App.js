import React, { useState, useEffect } from 'react';
import customAxis from './customAxios';
import './css/App.css';

function App() {
  // IP주소 변수 선언
  const [ip, setIp] = useState('');
  
  // IP주소 값 설정
  function callback(data) {
    setIp(data);
  }

  // 첫번째 렌더링 마친 후 실행
  useEffect(
    () => {
      // 클라이언트 IP주소를 알아내는 백엔드 함수 호출
      customAxis('/ip', callback);
    }, []
  );

  return (
    <div className="App">
      <div id="wrap">
        <TopContainer />
        <TreeContainer />
      </div>
    </div>
  );
}

function TopContainer() {

  const [userName, setUserName] = useState("Chu")
  const [msgCount, setMsgCount] = useState(8);
  const [readableDate, setReadableDate] = useState(25);
  
  return (
    <div>
      <div className='top_title'>
        <div className='top_title_row'>
          <div><span className="top_username">{userName}</span>님에게</div>
          <div><a href="#"><img src={require('./img/menu_icon.png')}/></a></div>
        </div>
        <div><span className="top_msgCount">{msgCount}</span>개의 메세지가 전달됐어요!</div> 
      </div>
      <div className='top_info'>
        <div>받은 메세지는 <span className='top_readableDate'>{readableDate}</span>일에 확인할 수 있어요</div>  
      </div>
    </div>
  );
}

function TreeContainer() {

  return (
    <div>
      <div id="tree_container">
        <img id="tree_img" src={require("./img/christmas_tree_image.png")} />
        <TreeItem />
        <PageIndicator />
      </div>
    </div>
  );
}

function TreeItem() {
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
        cols.push(
          <div className="tree_item_col">
            <div className="tree_item_sender">
              {itemSenders[rand_1_4()]}
            </div>
            <div>
              <img src={require(`./img/tree_item/item${rand_1_4()}.png`)} />
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

export default App;