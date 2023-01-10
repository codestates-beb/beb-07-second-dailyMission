import React, { useState } from "react";
import "./LoginModal.css";
import apiUrl from "../utils/api";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { status } from "../status/store";

function LoginModal(props) {
    const { open, close } = props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [signStatus, setSignStatus] = useRecoilState(status);

    const onUserIdHandler = (event) => {
        setUserId(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onClickLogin = () => {
        axios.post(`${apiUrl}signin`, {
            id: userId,
            pw: password

        })
            .then(res => {
                if (res.data.status === 'falied') {
                    alert('아이디 또는 비밀번호를 잘못 입력했습니다.')
                }
                else if (isChecked === false) {
                    const signData = res.data.message;
                    signData['isSigned'] = true;
                    setSignStatus(() => signData)
                    sessionStorage.setItem('signData', JSON.stringify(signData))
                    document.location.href = '/'
                }
                else if (isChecked === true) {
                    const signData = res.data.message;
                    signData['isSigned'] = true;
                    setSignStatus(() => signData)
                    localStorage.setItem('signData', JSON.stringify(signData))
                    document.location.href = '/'
                }
            })
    }

    const onClickSignUp = () => {
        window.location.href = '/signup';
    }

    const handleChecked = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        <div>Sign in to join 일상 미션!</div>
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <div className="main-input">
                            <input placeholder="아이디" value={userId} onChange={onUserIdHandler}></input><br></br>
                            <input type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler}></input>
                        </div>
                        <div className="main-btn">
                            <button onClick={onClickLogin}>
                                SIGN IN
                            </button>
                        </div>

                    </main>
                    <footer>
                        <div className="footer-check">
                            <input type='checkbox' onChange={handleChecked} ></input>
                            <span className="cb-text">로그인 상태 유지</span>
                        </div>
                        <button
                            onClick={onClickSignUp} className="footer-btn">
                            회원 가입
                        </button>
                    </footer>
                </section>
            ) : null
            }
        </div >
    );
}

export default LoginModal;