import React, {useState} from "react";
import "../css/JoinContainer.css";
import ButtonContainer from "./ButtonContainer";
import {login, join} from "../requestToSpring";

const publicURL = process.env.PUBLIC_URL;

function JoinContainer() {
    const [buttonText, setButtonText] = useState("트리 만들기");
    const [activePage, setActivePage] = useState('join');

    // join
    const [nickName, setNickName] = useState("");
    const [joinId, setJoinId] = useState("");
    const [joinPwd, setJoinPwd] = useState("");
    const [pwdCheck, setPwdCheck] = useState("");

    // login
    const [loginId, setLoginId] = useState("");
    const [loginPwd, setLoginPwd] = useState("");

    function toggleEvent(activePage) {

        setActivePage(activePage)

        if(activePage === "join") {
            setButtonText("트리 만들기");
        } else if(activePage === "login") {
            setButtonText("내 트리 보러가기");
        }
    }

    function onButtonClick(e) {
        e.preventDefault();

        if(formDataValidate()) {
            if(activePage === "join") {

                let joinData = {
                    nickname: nickName,
                    id: joinId,
                    password: joinPwd,
                };
                
                join(joinData, callback);
            } else if(activePage === "login") {

                let loginData = {
                    id: loginId,
                    password: loginPwd,
                };

                login(loginData, callback);
            }
        } else {
            alert("입력값을 한번 더 확인해주세요!");
        }
    }

    function callback(result) {
        if(result) {
            window.location = "/";
        } else {
            if (activePage === "join") {
                alert("회원가입에 실패하였습니다. 입력값을 한번 더 확인하세요! (아이디 중복)");
            }
            else if(activePage === "login") {
                alert("로그인이 실패하였습니다. 입력값을 한번 더 확인하세요!");
            }
        }

    }

        function formDataValidate() {

            if(activePage === "join") {
                if(nickName.length === 0 || nickName.length > 10 || nickName.trim() === "" ) return false;
                
                console.log("nickName");
                const regType = /^[a-z0-9+]{4,20}/;
                if(joinId.trim().length === 0 || joinId.trim().length < 4 || joinId.trim().length > 20 || !regType.test(joinId)) return false;
                console.log("joinid");
                
                if(joinPwd.trim().length === 0 || joinPwd.trim().length < 8) return false;
                console.log("joinPwd");
                
                if(pwdCheck.trim().length === 0 || pwdCheck.trim() !== joinPwd.trim()) return false;
                console.log("pwdCheck");
                
            } else if (activePage === "login") {
                if(loginId.trim().length === 0) return false;
                if(loginPwd.trim().length === 0) return false;
            }

            return true;
        }

    return (
        <div id="join_container">
            <div className="title_image_div">
                <img className="title_image" src={`${publicURL}/img/tree_item/item1.png`} alt="title_image"/>
            </div>
            <div className="box_container">
                
                <ToggleContainer 
                    toggleEvent={toggleEvent}
                />
                {activePage === 'join' 
                    ?   <JoinForm 
                            nickName={nickName}
                            joinId={joinId}
                            joinPwd={joinPwd}
                            pwdCheck={pwdCheck}
                            setNickName={setNickName}
                            setJoinId={setJoinId}
                            setJoinPwd={setJoinPwd}
                            setPwdCheck={setPwdCheck}
                        />
                    :   <LoginForm 
                            loginId={loginId}
                            loginPwd={loginPwd}
                            setLoginId={setLoginId}
                            setLoginPwd={setLoginPwd}
                        />
                }
            </div>
            <div className="button_container">
                {activePage === 'join' 
                    ?   
                    <ButtonContainer
                        buttonText={buttonText}
                        onButtonClick={onButtonClick}
                    />
                    :   
                    <ButtonContainer
                        buttonText={buttonText}
                        onButtonClick={onButtonClick}
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
        if(e.target.className === 'unselected') {
            if(e.target.id === 'join_tab') { // join_tab & unselected
                setJoinClsNm('selected');
                setLoginClsNm('unselected');

                props.toggleEvent('join');

            } else if (e.target.id === 'login_tab') {    // login_tab & unselected
                setJoinClsNm('unselected');
                setLoginClsNm('selected');

                props.toggleEvent('login');
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

function JoinForm(props) {

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
                                value={props.nickName}
                                onChange={(e) => {
                                    props.setNickName(e.target.value);
                                }}
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
                                value={props.joinId}
                                onChange={(e) => {
                                    props.setJoinId(e.target.value);
                                }}
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
                                value={props.joinPwd}
                                onChange={(e) => {
                                    props.setJoinPwd(e.target.value);
                                }}
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
                                value={props.pwdCheck}
                                onChange={(e) => {
                                    props.setPwdCheck(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function LoginForm(props) {

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
                                value={props.loginId}
                                onChange={(e) => {
                                    props.setLoginId(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="input_wrap">
                        <div className="input_label">비밀번호</div>
                        <div className="input_div">
                            <input 
                                className="input" 
                                type="password" 
                                value={props.loginPwd}
                                onChange={(e) => {
                                    props.setLoginPwd(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default JoinContainer;