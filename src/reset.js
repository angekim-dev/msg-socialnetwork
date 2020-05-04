import React, { version } from "react";
import axios from "./axios";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    render() {
        // version 1
        // if (this.state.step == 1) {
        //     return (
        //         <div>
        //             <input name="email"></input>
        //             <button></button>
        //         </div>
        //     );
        // } else if (this.state.step == 2) {
        //     return (
        //         <div>
        //             <input name="code"></input>
        //             <input name="pass"></input>
        //             <button></button>
        //         </div>
        //     );
        // }

        // version 2
        return (
            <div>
                {this.state.step == 1 && (
                    <div>
                        <input name="email"></input>
                        <button></button>
                    </div>
                )}
                {/* more code necessary */}
                {this.state.step == 2 && (
                    <div>
                        <input name="code"></input>
                        <input name="pass"></input>
                        <button></button>
                    </div>
                )}
            </div>
        );
    }
}
