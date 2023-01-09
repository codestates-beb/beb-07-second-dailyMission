import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { status } from '../status/store';
import LoginModal from "./LoginModal";


const Header = () => {
    const [signStatus, setSignStatus] = useRecoilState(status);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Link to="/"><img src="/assets/logo.png" /> </Link>
            {signStatus.userId === "unknown" ?
                <button onClick={openModal}>sign in</button> :
                <div>{signStatus.userName}님 안녕하세요!</div>}
            <LoginModal open={modalOpen} close={closeModal}> </LoginModal>
            <Link to="/signup"><button>sign up</button></Link>
        </div>
    )
};

export default Header;