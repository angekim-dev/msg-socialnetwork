import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        console.log("e.target.files[0] in uploader.js", e.target.files[0]);

        this.setState({
            file: e.target.files[0],
        });
    }
    uploadPic() {
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log("this.state.file", this.state.file);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                this.props.methodInApp(data.imageUrl);
                console.log("**data", data);
                this.props.toggleModal();
            })
            .catch((err) => {
                console.log("Error in uploadPic in uploader.js: ", err);
            });
    }

    // closeModal() {
    //     console.log("closing now");
    // }

    render() {
        return (
            <div className="uploader-modal">
                <p onClick={() => this.props.toggleModal()}>X</p>
                <h2 className="uploader-text">Hello from Uploader</h2>
                <input
                    onChange={(e) => this.handleChange(e)}
                    type="file"
                    name="file"
                ></input>
                <button onClick={() => this.uploadPic()}>
                    upload with uploadPic
                </button>
            </div>
        );
    }
}
