import React, { useState } from "react";
import apiUrl from "../utils/api";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { status } from "../status/store";


const SignUp = () => {
    const [signStatus, setSignStatus] = useRecoilState(status);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [idMessage, setIdMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] =
        useState("");

    const [isId, setIsId] = useState(false);
    const [isname, setIsName] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        const idRegExp = /^[ㄱ-ㅎ가-힣a-zA-z0-9]{4,12}$/;
        if (!idRegExp.test(currentId)) {
            setIdMessage("4-12 글자 사이 대소문자 또는 숫자만 입력 가능합니다.");
            setIsId(false);
        } else {
            setIdMessage("");
            setIsId(true);
        }
    };


    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);

        if (currentName.length < 2) {
            setNameMessage("닉네임은 2글자 이상 입력해주세요.");
            setIsName(false);
        } else {
            setNameMessage("");
            setIsName(true);
        }
    };

    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        const passwordRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상의 비밀번호만 사용 가능합니다."
            );
            setIsPassword(false);
        } else {
            setPasswordMessage("");
            setIsPassword(true);
        }
    };
    const onChangePasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setPasswordConfirm(currentPasswordConfirm);
        if (password !== currentPasswordConfirm) {
            setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
            setIsPasswordConfirm(false);
        } else {
            setPasswordConfirmMessage("");
            setIsPasswordConfirm(true);
        }
    };

    const onClickSubmit = () => {
        axios.post(`${apiUrl}signup`, {
            userId: id,
            password: password,
            userName: name,
        })
            .then(res => {
                console.log(res)
                if (res.data.message === "Same userId exists") {
                    setIdMessage('사용할 수 없는 아이디 입니다.')
                } else if (res.data.message === "Same userName exists") {
                    setNameMessage('사용할 수 없는 닉네임 입니다.')
                }
                else {
                    const signData = {
                        userId: id,
                        password: password,
                        userName: name,
                        isSigned: true,
                    };
                    setSignStatus(() => signData)
                    sessionStorage.setItem('signData', JSON.stringify(signData))
                    console.log(res)
                    document.location.href = '/'
                }

            })
    }

    return (
        <>
            <h3>Welcome ^^</h3>
            <div className="form">
                <div className="form-el">
                    <label htmlFor="id">ID</label> <br />
                    <input id="id" name="id" value={id} onChange={onChangeId} />
                    <p className="message"> {idMessage} </p>
                </div>

                <div className="form-el">
                    <label htmlFor="name">User Name</label> <br />
                    <input id="name" name="name" value={name} onChange={onChangeName} />
                    <p className="message">{nameMessage}</p>
                </div>
                <div className="form-el">
                    <label htmlFor="password">Password</label> <br />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <p className="message">{passwordMessage}</p>
                </div>
                <div className="form-el">
                    <label htmlFor="passwordConfirm">Password Confirm</label> <br />
                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        type="password"
                        onChange={onChangePasswordConfirm}
                    />
                    <p className="message">{passwordConfirmMessage}</p>
                </div>
                <button type="submit" onClick={onClickSubmit}>Submit</button>
            </div>
        </>
    );
};

export default SignUp;