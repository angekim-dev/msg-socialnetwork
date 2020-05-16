import axios from "./axios";

export async function getFriendsWannabes() {
    const { data } = await axios.get("/friends");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data,
    };
}

export async function acceptFriendship(id) {
    const { data } = await axios.post(`/friendshipstatus/${id}`, {
        text: "Accept",
    });
    console.log("***data in acceptFriendship", data);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id,
    };
}

export async function endFriendship(id) {
    const { data } = await axios.post(`/friendshipstatus/${id}`, {
        text: "End Friendship",
    });
    console.log("***data in endFriendship", data);
    return {
        type: "UNFRIEND",
        id,
    };
}
