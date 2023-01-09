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
                console.log(res)
                const signData = res.data.message;
                signData['isSigned'] = true;
                setSignStatus(() => signData)
                sessionStorage.setItem('signData', JSON.stringify(signData))
            })
    }

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
                        <input placeholder="아이디" value={userId} onChange={onUserIdHandler}></input><br></br>
                        <input type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler}></input>
                    </main>
                    <footer>
                        <button onClick={onClickLogin}>
                            SIGN IN
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
}

export default LoginModal;