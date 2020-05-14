import React, { useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsWannabes, acceptFriendship, endFriendship } from "./actions";
import ProfilePic from "./profilepic";

import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    return (
        <div>
            <p>People want to be your friends!</p>
        </div>
    );
}
