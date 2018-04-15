import React from "react";
import "./Logo.css";

const Logo = 
    <div>
        <div className="">
            <div className="logo-span float-left">
                <span className="q logo-main">Q</span>
                <span className="u logo-main">u</span>
                <span className="i logo-main">i</span>
                <span className="z logo-main">z</span>
                <span className="big-i logo-main">I</span>
                <span className="t logo-main">t</span>
                <span className="exc logo-main">!</span>
            </div>
            <span className="logo-text">Powered by </span>
            <a href="https://opentdb.com/"><img src="/assets/img/open-trivia-logo.png" className="open-trivia-logo"/></a>
        </div>
    </div>

export default Logo;