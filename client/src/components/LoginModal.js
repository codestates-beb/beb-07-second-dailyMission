import React from "react";
import "./LoginModal.css";

function LoginModal(props) {
    const { open, close } = props;


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
                        <input placeholder="아이디"></input><br></br>
                        <input placeholder="비밀번호"></input>
                    </main>
                    <footer>
                        <button>
                            SIGN IN
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
}

export default LoginModal;