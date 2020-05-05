import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            error: false,
        };
    }

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

    submitEmail() {
        axios
            .post("/password/reset/start", this.state)
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        step: 2,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Error in submitEmail in reset.js: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    submitNewPw() {
        axios
            .post("/password/reset/verify", this.state)
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        step: 3,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Error in submitNewPw in reset.js: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <div>
                <h3>I am the Reset Component!</h3>
                {this.state.error && <div>Oops something went wrong</div>}
                {this.state.step == 1 && (
                    <div>
                        <input
                            name="email"
                            placeholder="email"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <button onClick={(e) => this.submitEmail(e)}>
                            Send me the code!
                        </button>
                    </div>
                )}

                {this.state.step == 2 && (
                    <div>
                        <input
                            name="code"
                            placeholder="code"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <input
                            name="newPassword"
                            placeholder="new password"
                            type="password"
                            onChange={(e) => this.handleChange(e)}
                        ></input>
                        <button onClick={(e) => this.submitNewPw(e)}>
                            Reset my password!
                        </button>
                    </div>
                )}

                {this.state.step == 3 && (
                    <div>
                        <p>SUCCESS</p>
                        <Link to="/login">Click here to Log in!</Link>
                    </div>
                )}
            </div>
        );
    }
}
