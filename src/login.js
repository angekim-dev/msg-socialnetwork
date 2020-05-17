import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false, // true to show error message in render
        };
    }
    // no commas between methods
    handleChange(e) {
        console.log("e.target.value", e.target.value);
        console.log("e.target.name", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state", this.state) // sanity check, second argument of this.setState, callback function BECAUSE this.setState asynchronous
        );
    }
    submit() {
        console.log("about to submit", this.state);
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                // need route on server
                console.log("response: ", data);
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Error in axios.post '/login': ", err);
            });
    }

    render() {
        return (
            <div className="login">
                <h3>I am the Login Component!</h3>
                <Link to="/">Back to registration!</Link>
                {this.state.error && <div>Oops something went wrong</div>}
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>Login!</button>
            </div>
        );
    }
}
