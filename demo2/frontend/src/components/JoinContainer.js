import React, {useState} from "react";
import "../css/JoinContainer.css";
import ButtonContainer from "./ButtonContainer";

const publicURL = process.env.PUBLIC_URL;

function JoinContainer() {

    const [activePage, setActivePage] = useState('join');

    function onClick() {

        window.location = "/";

    }

    return (
        <div id="join_container">
            <div className="title_image_div">
                <img className="title_image" src={`${publicURL}/img/tree_item/item1.png`} />
            </div>
            <div className="box_container">
                
                <ToggleContainer 
                    setActivePage={setActivePage}
                />
                {activePage === 'join' 
                    ?   <JoinForm />
                    :   <LoginForm />
                }
            </div>
            <div className="button_container">
                {activePage === 'join' 
                    ?   
                    <ButtonContainer
                        buttonText="트리 만들기"
                        onClick={onClick}
                    />
                    :   
                    <ButtonContainer
                        buttonText="내 트리 보러가기"
                    />  
                }
            </div>
        </div>
    );
}

function ToggleContainer(props) {

    const [joinClsNm, setJoinClsNm] = useState('selected');
    const [loginClsNm, setLoginClsNm] = useState('unselected');

    function onClick (e) {
        if(e.target.className == 'unselected') {
            if(e.target.id == 'join_tab') { // join_tab & unselected
                setJoinClsNm('selected');
                setLoginClsNm('unselected');

                props.setActivePage('join');
            } else if (e.target.id == 'login_tab') {    // login_tab & unselected
                setJoinClsNm('unselected');
                setLoginClsNm('selected');

                props.setActivePage('login');
            }
        }
    }
    return (
        <div className="toggle_container"
            onClick={onClick}
            >
            <div id="join_tab" className={joinClsNm}>
                회원가입
            </div>
            <div id="login_tab" className={loginClsNm}>
                로그인
            </div>
        </div>
    );
}

function JoinForm() {

    return (
        <>
            <div className="form_container">
                <div className="form_wrap">
                    <div className="input_wrap">
                        <div className="input_label">닉네임</div>
                        <div className="input_div">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="10자 이하" 
                            />
                        </div>
                    </div>
                    <div className="input_wrap">
                        <div className="input_label">아이디</div>
                        <div className="input_div">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="영문 소문자, 숫자 4~20자" 
                            />
                        </div>
                    </div>
                    <div className="input_wrap">
                        <div className="input_label">비밀번호</div>
                        <div className="input_div">
                            <input 
                                className="input"
                                type="password" 
                                placeholder="8자 이상 입력해주세요"
                            />
                        </div>
                    </div>
                    <div className="input_wrap">
                        <div className="input_label">비밀번호 확인</div>
                        <div className="input_div">
                            <input 
                                className="input"
                                type="password" 
                                placeholder="한번 더 입력해주세요"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function LoginForm() {

    return (
        <>
            <div className="form_container">
                <div className="form_wrap">
                    <div className="input_wrap">
                        <div className="input_label">아이디</div>
                        <div className="input_div">
                            <input 
                                className="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className="input_wrap">
                        <div className="input_label">비밀번호</div>
                        <div className="input_div">
                            <input 
                                className="input" 
                                type="text" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default JoinContainer;