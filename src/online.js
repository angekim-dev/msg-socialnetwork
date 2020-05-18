import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function OnlineUsers() {
    return (
        <div>
            <p>These people are online</p>
        </div>
    );
}
