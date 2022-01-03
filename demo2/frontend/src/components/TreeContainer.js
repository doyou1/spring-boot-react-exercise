import React, {useState} from "react";
import "../css/TreeContainer.css";

const publicURL = process.env.PUBLIC_URL;

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
                  
          <img id="tree_img" src={`${publicURL}/img/christmas_tree_image.png`} />
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
                <img src={`${publicURL}/img/tree_item/item${imageIndex}.png`} />
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
              <img className="message_image" src={`${publicURL}/img/tree_item/item${props.imageIndex}.png`} />
          <div>
            <div className="message_text_div">
              <div className="message_text">
                Hellow World!
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

export default TreeContainer;