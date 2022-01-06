import React, {useEffect, useState} from "react";
import "../css/SendContainer.css";
import { send } from "../requestToSpring";
import ButtonContainer from "./ButtonContainer";

const publicURL = process.env.PUBLIC_URL;

function SendContainer(props) {

    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');

    const [clickAble, setClickAble] = useState(false);
    
    function inputCheck() {
        if(message.length > 0 && nickname.length > 0) {
            setClickAble(true);
        } else {
            setClickAble(false);
        }
    }

    function onButtonClick() {
        if(formDataValidate()) {
            let sendData = {
                sender_nickname: nickname,
                message: message,
                receiver_id: props.receiver_id,
            };
            
            send(sendData, callback);
        } else {
            alert("입력값을 한번 더 확인해주세요!");
        }
    }

    function callback(result) {
        if(result) {
            window.location = `/tree/${props.receiver_id}`;
        }
    }

    function formDataValidate() {

        if(message.trim().length === 0) return false;
        if(nickname.trim().length === 0) return false;

        return true;
    }

    return (
        <div id="send_container">
            <div className="top_container">
                <div className="back_button_container">
                    <a href="/" className="back_button">
                        <img src={`${publicURL}/img/left_arrow.png`} alt="left_arrow" />
                        <div>이전으로</div>
                    </a>
                </div>
                <div class="top_text_container">
                    메세지를 남겨주세요
                </div>
            </div>
            <div className="message_input_container">
                <img className="message_image" src={`${publicURL}/img/tree_item/item1.png`} alt="message_image"/>
                <textarea 
                    className="message_input" 
                    rows={55}
                    placeholder="따뜻한 메세지를 남겨주세요"
                    onChange={(e) => {
                        setMessage(e.target.value);
                        inputCheck();
                    }}
                    value={message}
                />
            </div>
            <div className="nickname_input_container">
                <div className="nickname_input_div">
                    <input 
                        className="nickname_input" 
                        type="text" 
                        placeholder="닉네임을 입력하세요 (10자 이하)"
                        defaultValue={props.currentUserInfo.nickname}
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value)
                            inputCheck();
                        }}
                    />
                </div>
            </div>
            <ButtonContainer 
                mainPageType="send"
                onButtonClick={onButtonClick}
                clickAble={clickAble}
            />
        </div>
    );
}

export default SendContainer;