import axios from "./axios";

export async function getFriendsWannabes() {
    const { data } = await axios.get("/friends");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data,
    };
}

// export function getFriendsWannabes() {
//     axios.get("/friends").then((result) => {
//         console.log("***RESULT", result);
//         return {
//             type: "RECEIVE_FRIENDS_WANNABES",
//             friendsWannabes: result,
//         };
//     });
// }

export async function acceptFriendship(id) {
    await axios.post(`api/friendshipstatus/${id}`, {
        text: "Accept",
    });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id,
    };
}

export async function endFriendship(id) {
    await axios.post(`api/friendshipstatus/${id}`, {
        text: "End friendship",
    });
    return {
        type: "UNFRIEND",
        id,
    };
}

export function chatMessages(msgs) {
    return {
        type: "GET_LAST_TEN_MESSAGES",
        msgs,
    };
}