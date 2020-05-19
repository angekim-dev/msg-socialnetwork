import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";

export default function OnlineUsers() {
    const peopleOnline = useSelector((state) => state && state.peopleOnline);
    console.log("These people are online", peopleOnline);
    return (
        <div className="onlineUsers-container">
            <h3>These people are online</h3>
            <div className="onlineUsers">
                <div className="peopleOnline">
                    {peopleOnline &&
                        peopleOnline.map((id) => {
                            return (
                                <div key={id.id} className="personOnline">
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
        </div>
    );
}
