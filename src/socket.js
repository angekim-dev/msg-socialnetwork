import * as io from "socket.io-client";

import { chatMessages, chatMessage, peopleOnline } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));
        //also data possible or lastTenMsg

        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

        socket.on("peopleOnline", (x) => store.dispatch(peopleOnline(x)));
    }
};
