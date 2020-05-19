import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";

export default function OnlineUsers() {
    const peopleOnline = useSelector((state) => state && state.peopleOnline);
    console.log("These people are online", peopleOnline);
    return (
        <div>
            <p>These people are online</p>
            <div>
                {peopleOnline &&
                    peopleOnline.map((id) => {
                        return (
                            <div key={id.id}>
                                <Link to={`/online`}>
                                    <ProfilePic
                                        first={id.first}
                                        last={id.last}
                                        imageUrl={id.image_url}
                                    />
                                    <div>
                                        {id.first} {id.last}
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
