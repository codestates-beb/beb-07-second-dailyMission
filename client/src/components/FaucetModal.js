import React, { useState } from "react";
import "./Modal.css";
import apiUrl from "../utils/api";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { status } from "../status/store";
import { Link } from 'react-router-dom';

function LoginModal(props) {
    const { open, close } = props;
    const [choice, setChoice] = useState("ethereum");
    const [alertMessage, setAlertMessage] = useState("");
    const [faucetStatus, setFaucetStatus] = useState(false);
    const [signStatus, setSignStatus] = useRecoilState(status);

    const selectFaucet = ["ethereum", "token"]
    const options = selectFaucet.map((faucet) => {
        return <option value={faucet}>{faucet}</option>
    })

    const handleFaucet = (event) => {
        setChoice(event.target.value)
        setAlertMessage("");
        setFaucetStatus(false);
    };

    const onClickFaucet = () => {
        axios.get(`${apiUrl}getfaucet`, {
            params: {
                userid: signStatus.userId,
                type: choice,
            }
        })
            .then(res => {
                if (res.data.message === "Has not passed 24 hours since last faucet") {
                    setAlertMessage(`Faucet 요청은 하루에 한 번만 가능합니다. 이전 요청으로부터 24시간 이후에 다시 시도해주세요.`)
                } else if (res.data.status === "success") {
                    setAlertMessage("요청이 처리되었습니다.")
                    setFaucetStatus(true);
                }
            })
    }

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        <div>Daily Faucet</div>
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <div className="main-input">
                            <select onChange={handleFaucet} >{options}</select>

                        </div>
                        <div className="main-btn">
                            {choice === "ethereum" ? (
                                <button onClick={onClickFaucet}>
                                    Send Me ETH
                                </button>
                            ) :
                                (<button onClick={onClickFaucet}>
                                    Send Me Token
                                </button>)}
                        </div>
                    </main>
                    <footer>

                        <p className="footer-message">{alertMessage}</p>
                        {faucetStatus === true ? (
                            <Link to='/mypage' onClick={close} className='to-mypage'>마이페이지에서 잔고 확인하기</Link>) : ('')}
                    </footer>
                </section>
            ) : null
            }
        </div >
    );
}

export default LoginModal;