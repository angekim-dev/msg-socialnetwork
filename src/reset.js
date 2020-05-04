import React, { version } from "react";
import axios from "./axios";

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
                        <button>Reset my password!</button>
                    </div>
                )}

                {this.state.step == 3 && (
                    <div>
                        <p>SUCCESS</p>
                    </div>
                )}
            </div>
        );
    }
}
