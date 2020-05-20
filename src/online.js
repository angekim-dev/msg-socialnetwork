import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";

export default function OnlineUsers() {
    const peopleOnline = useSelector((state) => state && state.peopleOnline);
    const peopleOffline = useSelector((state) => state && state.peopleOffline);
    console.log("These people are online", peopleOnline);
    console.log("This person just logged out", peopleOffline);
    return (
        <div className="onlineUsers-container">
            <h3>These people are online</h3>
            <div className="onlineUsers">
                <div className="peopleOnline">
                    {!peopleOffline &&
                        peopleOnline &&
                        peopleOnline.map((user) => {
                            return (
                                <div key={user.id} className="personOnline">
                                    <Link to={`/user/${user.id}`}>
                                        <ProfilePic
                                            first={user.first}
                                            last={user.last}
                                            imageUrl={user.image_url}
                                        />
                                        <div>
                                            {user.first} {user.last}
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
                <div className="peopleAfterLogout">
                    {peopleOffline &&
                        peopleOnline &&
                        peopleOnline.map((user) => {
                            return (
                                <div key={user.id} className="personOnline">
                                    <Link to={`/user/${user.id}`}>
                                        <ProfilePic
                                            first={user.first}
                                            last={user.last}
                                            imageUrl={user.image_url}
                                        />
                                        <div>
                                            {user.first} {user.last}
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    somebody just left
                </div>
            </div>
        </div>
    );
}
