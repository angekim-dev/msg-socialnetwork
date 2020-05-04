import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Logo from "./logo";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route
                        path="/password/reset/start"
                        component={ResetPassword}
                    />
                </div>
            </HashRouter>
        </div>
    );
}
