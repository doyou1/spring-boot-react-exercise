import React from "react";
import "../css/ButtonContainer.css";
import { useEffect, useState } from "react";

const publicURL = process.env.PUBLIC_URL;


function ButtonContainer(props) {
  const [buttonText, setButtonText] = useState("시작하기");

  useEffect(() => {
    checkPageType();
  });

  function checkPageType() {
    switch (props.mainPageType) {
      case "init":
        setButtonText("시작하기");
        break;
      case "host":
        setButtonText("트리 링크 복사하기");
        break;
      case "treelink":
        setButtonText("트리 꾸며주기");
        break;
      case "send":
        setButtonText("다음으로");
        break;
      default :
        break;
    }
  }

    return (
      <>
      {
        props.clickAble
        ?
        <div id="button_container"
          onClick={props.onButtonClick}
          >
          <div className="button_text">
            {buttonText}
          </div>
          <div id="click_event_div">
            <img src={`${publicURL}/img/check_icon.png`} alt="check_icon"/>
          </div>
        </div>
        :
        <div id="button_container"
          className="disable_click"
          >
          <div className="button_text">
            {buttonText}
          </div>
        </div>
        }
      </>
    );
}

ButtonContainer.defaultProps = {
  clickAble : true,
};

export default ButtonContainer;