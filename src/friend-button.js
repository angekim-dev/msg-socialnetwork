import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton({ otherId }) {
    console.log("otherId: ", otherId);
    const [buttonText, setButtonText] = useState("To friend or not to friend");

    useEffect(() => {
        console.log("I am Friendbutton component mounting..");
        axios
            .get(`/api/friendshipstatus/${otherId}`)
            .then(({ data }) => {
                console.log("resp: ", data);
                setButtonText(data.text);
            })
            .catch((err) => {
                console.log("Error in axios friendshipstatus: ", err);
            });
    }, []);

    function submit() {
        console.log(
            "I clicked on the button and the button text is",
            buttonText
        );
        axios
            .post(`/api/friendshipstatus/${otherId}`, { text: buttonText })
            .then(({ data }) => {
                console.log("LINE 36", data);
                setButtonText(data.text);
            })
            .catch((err) => {
                console.log("Error in axios POST friendship: ", err);
            });
    }

    return (
        <div>
            <button onClick={submit}>{buttonText}</button>
        </div>
    );
}
