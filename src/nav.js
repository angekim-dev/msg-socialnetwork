import React from "react";
import Logout from "./logout";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div className="nav">
            <Logout />

            <div>
                <Link to="/users">FIND PEOPLE</Link>
            </div>
            <div>
                <Link to="/friends">FRIENDS</Link>
            </div>
            <div>
                <Link to="/chat">CHAT</Link>
            </div>
            <div>
                <Link to="/online">ONLINE</Link>
            </div>
            <div>
                <Link to="/">PROFILE</Link>
            </div>
        </div>
    );
}
