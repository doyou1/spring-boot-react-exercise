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
        <div class="tree_item_container">
          <div class="tree_item_row1">
            <div>abc</div>
          </div>
          <div class="tree_item_row2">
            <div>ABC</div>
            <div>DEF</div>
            <div>DEF</div>
          </div>
          <div class="tree_item_row3">
            <div>
              123
            </div>
            <div>
              456
            </div>
            <div>
              789
            </div>
            <div>
              789
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;