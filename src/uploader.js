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

    render() {
        return (
            <div className="uploader-modal">
                <p onClick={() => this.props.toggleModal()}>X</p>
                <div className="uploader">
                    <h4 className="uploader-text">
                        Please upload your picture here
                    </h4>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="file"
                        name="file"
                    ></input>
                    <button onClick={() => this.uploadPic()}>upload</button>
                </div>
            </div>
        );
    }
}
