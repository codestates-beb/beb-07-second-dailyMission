import React from "react";
import "./Footer.css"

export default function Footer() {
    return (
        <div className="Footer">

            <ul className="footer-ul">
                <li className="footer-li">
                    <a className="footer-a" href="https://github.com/codestates-beb/beb-07-second-dailyMission">Github</a>
                </li>
                <li className="footer-li">
                    <a className="footer-a" href="https://documenter.getpostman.com/view/3535243/2s8Z75RUrG">API</a>
                </li>
            </ul>
            <div><span className="footer-text">🄯 2023 BEB Project2 일상미션, kr.</span></div>
        </div>
    )
}