export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        // code to update Redux goes here
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes,
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        // code to update Redux goes here
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
        console.log("***state in ACCEPT in reducer: ", state);
    }

    if (action.type == "UNFRIEND") {
        // code to update Redux goes here
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                (betterUser) => betterUser.id != action.id
            ),
        };
        console.log("***state in END in reducer: ", state);
    }

    if (action.type == "GET_LAST_TEN_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs,
        };
    }

    if (action.type == "POST_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.msg],
        };
        console.log("state in reducer", state);
    }

    if (action.type == "THEY_ONLINE") {
        state = {
            ...state,
            peopleOnline: action.x,
        };
        console.log("state in reducer", state);
    }
    return state;
}
