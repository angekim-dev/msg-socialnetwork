import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
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
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                // need route on server
                console.log("****response: ", data);
                if (data.success) {
                    console.log("registration success");
                    this.setState({
                        error: false,
                    });
                    location.replace("/");
                } else {
                    console.log("registration failure");
                    this.setState({
                        error: true,
                    });
                    console.log("in axios in submit", this.state);
                }
            })
            .catch((err) => {
                console.log("Error in axios.post '/register': ", err);
            });
        console.log("after axios in submit", this.state);
    }

    render() {
        return (
            <div className="reg">
                <h3>I am the Registration Component!</h3>
                <Link to="/login">Click here to Log in!</Link>
                <br></br>
                {this.state.error && <div>Oops something went wrong</div>}
                <input
                    name="first"
                    placeholder="first"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={(e) => this.handleChange(e)}
                />
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
                <button onClick={() => this.submit()}>Register!</button>
            </div>
        );
    }
}
