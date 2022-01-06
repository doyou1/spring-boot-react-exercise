import React, {useState, useEffect} from "react";
import "../css/TreeContainer.css";

const publicURL = process.env.PUBLIC_URL;

function TreeContainer(props) {
    const [msgSender, setMsgSender] = useState('');
    const [message, setMessage] = useState('');
    const [imgIdx, setImgIdx] = useState(1);
    const [treeItemFlag, setTreeItemFlag] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
      if (props.mainPageType === 'init') setTreeItemFlag(false);
      else setTreeItemFlag(true);
    });

    function showModal(e) {
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
              mainPageType={props.mainPageType}
              messages={props.messages}
              showModal={function(sender_nickname, message, index) {
                showModal()
                setMsgSender(sender_nickname);
                setMessage(message);
                setImgIdx(index);
              }}
              setPageCount={setPageCount}
              currentPage={currentPage}
            />
            <PageIndicator 
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              />
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
      if(props.messages.length > 0) {
        makeTreeItems(props.messages);
      }
    }, [props.messages]);

    async function makeTreeItems(messages) {
      const result = [];
      var idx = 0;
      var pageCount = 0;

      while(idx < messages.length) {
        const list = [];
        pageCount++;
        for (let i = 0; i < treeColCounts.length; i++) {
          const colCount = treeColCounts[i];
          const cols = [];
          for (let j = 0; j < colCount; j++) {
            if (idx === messages.length) break;
            const msg = messages[idx++];
            const imageIndex = 1; 
    
            cols.push(
              <div key={pageCount+"_"+i+"_"+j} className="tree_item_col" onClick={() => props.showModal(msg.sender_nickname, msg.message, imageIndex)}>
                <div className="tree_item_sender">
                  {msg.sender_nickname}
                </div>
                <div>
                  <img src={`${publicURL}/img/tree_item/item${imageIndex}.png`} alt={`tree_item${imageIndex}`}/>
                </div>
              </div>
            );
          }
          list.push(<div key={pageCount+"_"+i} className={`tree_item_row${i+1}`}> {cols} </div>);
        }
        result.push(list);
      }

      props.setPageCount(pageCount);
      setTreeItems(result);
    }
  
    return (
      <div className="tree_item_container">
        {treeItems[props.currentPage - 1]}
      </div>
    );
}
  
  function MessageModal(props) {
    
    return (
      <div id="modal" className='modalDialog'>
        <div>
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
  
  function PageIndicator(props) {
      
    const [ableFlags, setAbleFlags] = useState({
      left: "disable",
      right: "disable",
    });

    useEffect(() => {
      arrowClickAbleCheck();
    }, [props.currentPage, props.pageCount]);
  
    function arrowClickAbleCheck() {
      if(props.currentPage === 1){
        setAbleFlags((prev) => {
          return {
            left: "disable",
            right: prev.right,
          };
        });
      }
      if(props.currentPage > 1){
        setAbleFlags((prev) => {
          return {
            left: "able",
            right: prev.right,
          };
        });
      }
      if(props.currentPage === props.pageCount) {
        setAbleFlags((prev) => {
          return {
            left: prev.left,
            right: "disable",
          };
        });
      }
      if(props.currentPage < props.pageCount) {
        setAbleFlags((prev) => {
          return {
            left: prev.left,
            right: "able",
          };
        });
      }
    }

    function arrowClick(direction) {
      if(direction === 'left') {
        if(props.currentPage === 1) return;
        else {
          props.setCurrentPage((prev) => {return prev - 1});
          arrowClickAbleCheck();  
        }
      }
      else if(direction === 'right') {
        if(props.currentPage === props.pageCount) return;
        else {
          props.setCurrentPage((prev) => {return prev + 1});
          arrowClickAbleCheck();
        }
      }
    }

    return (
      <div id="page_indicator_container">
        <div className={`page_indicator_item ${ableFlags.left}`}>
          <a href="/" onClick={(e) => {
            e.preventDefault();
            arrowClick('left');
            
            return;
          }}>&lt;&lt;</a>
        </div>
        <div className="page_indicator_item page_indicator_text">
          {props.currentPage} / {props.pageCount} 
        </div>
        <div className={`page_indicator_item ${ableFlags.right}`}>
          <a href="/" onClick={(e) => {
            e.preventDefault();
            arrowClick('right');

            return;
          }}>&gt;&gt;</a>
        </div>      
      </div>
    );
  }

export default TreeContainer;