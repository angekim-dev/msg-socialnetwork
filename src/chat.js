import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && chatMessages);

    useEffect(() => {
        console.log("chat hooks component has mounted");
        console.log("elemRef = ", elemRef);
        console.log("scrollTop: ", elemRef.current.scrollTop);
        console.log("clientHeight: ", elemRef.current.clientHeight);
        console.log("scrollHeight: ", elemRef.current.scrollHeight);

        // I want my container to scroll from the top the following calculation:
        // 360 - 300
        // 60 pixels from the top
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        // every time you get a chat message DO THIS calculation
    }, []);

    //this will be undefined for you right now
    console.log("here are my last 10 chat messages: ", chatMessages);

    const keyCheck = (e) => {
        console.log("value: ", e.target.value);
        console.log("key pressed: ", e.key);

        if (e.key === "Enter") {
            e.preventDefault(); // this will prevent going to the next line
            console.log(e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div>
            <p className="chat-title">Welcome to Chat</p>
            <div className="chat-messages-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((text) => {
                        return (
                            <div key={text.chats_id}>
                                <Link to={`/user/${text.id}`}>
                                    <ProfilePic
                                        first={text.first}
                                        last={text.last}
                                        imageUrl={text.image_url}
                                    />
                                    <div>
                                        {text.first} {text.last}
                                    </div>
                                </Link>
                                <div>{text.created_at}</div>
                                <div>{text.message}</div>
                            </div>
                        );
                    })}
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
