import React, { useEffect } from "react";
// import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsWannabes, acceptFriendship, endFriendship } from "./actions";
import ProfilePic from "./profilepic";

import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();
    // console.log("***", dispatch);

    useEffect(() => {
        dispatch(getFriendsWannabes());
    }, []);

    const wannabes = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((user) => user.accepted == false)
    );
    console.log("***those are the wannabes", wannabes);

    const friends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((user) => user.accepted == true)
    );
    console.log("***those are the friends", friends);

    return (
        <div className="friends-wannabes-container">
            <div>
                {wannabes && !wannabes.length && (
                    <h5>People do not want to be your friends!</h5>
                )}
                {wannabes && wannabes.length && (
                    <h5>People want to be your friends!</h5>
                )}
            </div>
            <div className="friends-wannabes">
                {wannabes &&
                    wannabes.map((user) => (
                        <div key={user.id}>
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
                            <button
                                onClick={() =>
                                    dispatch(acceptFriendship(user.id))
                                }
                            >
                                Accept
                            </button>
                        </div>
                    ))}
            </div>
            <div>
                {friends && !friends.length && <h5>You are not popular!</h5>}
                {friends && friends.length && <h5>You are so popular!</h5>}
            </div>
            <div className="friends-wannabes">
                {friends &&
                    friends.map((user) => (
                        <div key={user.id}>
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
                            <button
                                onClick={() => dispatch(endFriendship(user.id))}
                            >
                                End friendship
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
