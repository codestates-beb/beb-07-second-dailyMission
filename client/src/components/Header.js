import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { status } from '../status/store';
import LoginModal from './LoginModal';
import FaucetModal from './FaucetModal';
import './Header.css';

const Header = () => {
    const [signStatus, setSignStatus] = useRecoilState(status);
    const [modalOpen, setModalOpen] = useState(false);
    const [view, setView] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const signOut = () => {
        sessionStorage.clear();
        localStorage.clear();
        document.location.href = '/'
    }

    return (
        <div align="center">
            <div className="header">
                <Link to="/">
                    <img className='logo' src="/assets/logo.png" />{' '}
                </Link>
                {signStatus.isSigned === false ? (
                    <><button onClick={openModal}>sign in</button>
                        <LoginModal open={modalOpen} close={closeModal}>
                            {' '}
                        </LoginModal>
                        <Link to="/signup">
                            <button>sign up</button>
                        </Link>
                    </>
                ) : (
                    <div>
                        <ul onClick={() => { setView(!view) }}>
                            반가워요, {signStatus.userName}님!
                            {view ? '⌃' : '⌄'}
                            {view &&
                                <div>
                                    <li className='drop-down'>
                                        <Link to="/mypage">마이페이지
                                        </Link>
                                    </li>
                                    <li className='drop-down'>
                                        <button onClick={signOut}>로그아웃
                                        </button></li>


                                </div>}
                        </ul>
                        <button onClick={openModal}>faucet</button>
                        <FaucetModal open={modalOpen} close={closeModal}>
                            {' '}
                        </FaucetModal>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
