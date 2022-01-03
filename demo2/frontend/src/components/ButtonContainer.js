import React, {useState} from "react";
import "../css/ButtonContainer.css";

const publicURL = process.env.PUBLIC_URL;


function ButtonContainer(props) {

    return (
      <>
      {
        props.clickAble
        ?
        <div id="button_container"
          onClick={props.onClick}
          >
          <div className="button_text">
            {props.buttonText}
          </div>
        </div>
        :
        <div id="button_container"
          className="disable_click"
          >
          <div className="button_text">
            {props.buttonText}
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