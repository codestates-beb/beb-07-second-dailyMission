import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { status } from '../status/store';
import LoginModal from './LoginModal';
import './Header.css';

const Header = () => {
    const [signStatus, setSignStatus] = useRecoilState(status);
    const [modalOpen, setModalOpen] = useState(false);

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
                    <img src="/assets/logo.png" />{' '}
                </Link>
                {signStatus.isSigned === false ? (
                    <button onClick={openModal}>sign in</button>
                ) : (
                    <Link to="/mypage">{signStatus.userName}</Link>
                )}
                <LoginModal open={modalOpen} close={closeModal}>
                    {' '}
                </LoginModal>
                {signStatus.isSigned === true ?
                    (<button onClick={signOut}>sign out</button>) :
                    (<Link to="/signup">
                        <button>sign up</button>
                    </Link>)}

            </div>
        </div>
    );
};

export default Header;
