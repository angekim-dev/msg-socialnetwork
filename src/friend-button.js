import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton({ otherId }) {
    console.log("otherId: ", otherId);
    const [buttonText, setButtonText] = useState("Make friend request");

    useEffect(() => {
        console.log("I am Friendbutton component mounting..");
        // axios.get(`/friendshipstatus/${otherId}`).then((resp) => {
        //     console.log("resp: ", resp);
        //     setButtonText(resp.data.buttonText);
        // });
    }, []);

    function submit() {
        // option1 axios request here 1 of 4 OR 3
        // if / else
        // if make friend request -> insert into table
        // friendship status false
        // if cancel, delete row from table where user1=user1 SAME WITH ENDING friendship
        // if accept -> status of friendship changed from false to true
        // OR decisions on SERVER side (one route with lots of logic, or mini-routes with little logic)
        console.log(
            "I clicked on the button and the button text is",
            buttonText
        );
    }

    return (
        <div>
            <button onClick={submit}>{buttonText}</button>
        </div>
    );
}
