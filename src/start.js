import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./logo";
import App from "./app";

// import { useStatefulFields, useAuthSubmit } from "./hooks";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    // elem = <Logo />;
    elem = <App />;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
