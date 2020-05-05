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

    uploadPic() {
        this.props.methodInApp("whoa");
    }

    // closeModal() {
    //     console.log("closing now");
    // }

    render() {
        return (
            <div className="uploader-modal">
                <p onClick={() => this.props.toggleModal()}>X</p>
                <h2 className="uploader-text">Hello from Uploader</h2>
                <input type="file"></input>
                <button onClick={() => this.uploadPic()}>
                    upload with uploadPic
                </button>
            </div>
        );
    }
}
