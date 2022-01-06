import React, {useState, useEffect} from "react";
import "../css/TreeContainer.css";

const publicURL = process.env.PUBLIC_URL;

function TreeContainer(props) {
    const [msgSender, setMsgSender] = useState('');
    const [message, setMessage] = useState('');
    const [imgIdx, setImgIdx] = useState(1);
    const [treeItemFlag, setTreeItemFlag] = useState(false);

    useEffect(() => {
      checkPageType();
    });

    function checkPageType() {
      switch (props.mainPageType) {
        case "init":
          setTreeItemFlag(false);
          break;
        case "host":
          setTreeItemFlag(true);
          if (props.currentUserInfo.nickname !== null) {
          }
          break;
        case "treelink":
          setTreeItemFlag(true);
          if (props.linkUserInfo.nickname !== null) {
          
          }
          break;
        default :
          break;
      }
    }


    function showModal() {
      window.location = "#modal"
    }
  
    function closeModal() {
      window.location = "#"
    }

    return (
      <div>
        <div id="tree_container">
          <img id="tree_img" src={`${publicURL}/img/christmas_tree_image.png`} alt="tree_image" />
          {treeItemFlag
            ? 
            <>
            <TreeItemContainer
              linkMessages={props.linkMessages}
              hostMessages={props.hostMessages}

              mainPageType={props.mainPageType}
              showModal={function(sender_nickname, message, index) {
                showModal()
                setMsgSender(sender_nickname);
                setMessage(message);
                setImgIdx(index);
              }}
            />
            <PageIndicator />
            </>
            :
            null
          }
          <MessageModal
            messageSender={msgSender}
            message={message}
            imageIndex={imgIdx}
            closeModal={closeModal}
          />
        </div>
      </div>
    );
}

function TreeItemContainer(props) {
    const treeColCounts = [1, 3, 4];
    const [treeItems, setTreeItems] = useState([]);

    useEffect(() => {
      if(props.mainPageType === 'treelink' && props.linkMessages.length !== 0) {
        setTreeItems(makeTreeItems(props.linkMessages));
      } else if (props.mainPageType === 'host' && props.hostMessages.length !== 0) {
        setTreeItems(makeTreeItems(props.hostMessages));
      }
    });

    function makeTreeItems(messages) {
      const result = [];
      var idx = 0;

      for (let i = 0; i < treeColCounts.length; i++) {
        const colCount = treeColCounts[i];
        const cols = [];
        for (let j = 0; j < colCount; j++) {
          if (idx === messages.length) break;
          const msg = messages[idx++];
          const imageIndex = 1; 
  
          cols.push(
            <div className="tree_item_col" onClick={() => props.showModal(msg.sender_nickname, msg.message, imageIndex)}>
              <div className="tree_item_sender">
                {msg.sender_nickname}
              </div>
              <div>
                <img src={`${publicURL}/img/tree_item/item${imageIndex}.png`} alt={`tree_item${imageIndex}`}/>
              </div>
            </div>
          );
        }
        result.push(<div className={`tree_item_row${i+1}`}> {cols} </div>);
      }

      return result;
    }
  
    return (
      <div className="tree_item_container">
        {treeItems}
      </div>
    );
  }
  
  function MessageModal(props) {
    
    return (
      <div id="modal" className='modalDialog'>
        <div>
          <a href="#" title="Delete" className='delete'>지우기</a>
              <img className="message_image" src={`${publicURL}/img/tree_item/item${props.imageIndex}.png`} alt={`tree_item${props.imageIndex}`} />
          <div>
            <div className="message_text_div">
              <div className="message_text">
                {props.message}
              </div>
            </div>
            <div className="message_sender_div">
              <div className="message_sender">
                from. {props.messageSender}
              </div>
            </div>
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

export default TreeContainer;