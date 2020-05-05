import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    // componentDidMount() {
    //     console.log("uploader mounted");
    // }

    methodInUploader() {
        this.props.methodInApp("whoa");
    }

    render() {
        return (
            <div>
                <h2 className="uploader-text">Hello from Uploader</h2>
                <h2 onClick={() => this.methodInUploader()}>
                    Click here to run methodInUploader
                </h2>
            </div>
        );
    }
}
