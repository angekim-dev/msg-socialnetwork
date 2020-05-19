import * as io from "socket.io-client";

import { chat, chatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chat", (msgs) => store.dispatch(chat(msgs)));
        //also data possible or lastTenMsg

        // socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

        socket.on("addChatMsg", (msg) => {
            console.log(
                `Got a message in the client!! I'm about to start the whole redux process by dispatching here. My message is ${msg}`
            );
        });
    }
};
