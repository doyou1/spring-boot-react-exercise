import React, {useState} from "react";
import "../css/SendContainer.css";
import ButtonContainer from "./ButtonContainer";

const publicURL = process.env.PUBLIC_URL;

function SendContainer() {

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

    function onClick() {
        window.location = "/";
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
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value)
                            inputCheck();
                        }}
                    />
                </div>
            </div>
            <ButtonContainer 
                buttonText="다음으로"
                onClick={onClick}
                clickAble={clickAble}
            />
        </div>
    );
}

export default SendContainer;