import * as io from "socket.io-client";

import {
    chatMessages,
    chatMessage,
    peopleOnline,
    peopleOffline,
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));
        //also data possible or lastTenMsg

        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

        socket.on("peopleOnline", (x) => store.dispatch(peopleOnline(x)));

        socket.on("peopleOffline", (id) => store.dispatch(peopleOffline(id)));
    }
};
