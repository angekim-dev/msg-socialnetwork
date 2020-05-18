import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unsavedBio: null,
            inProgress: false,
        };
    }

    handleChange(e) {
        console.log("e.target.value: ", e.target.value);
        this.setState({
            unsavedBio: e.target.value,
        });
    }

    writeBio() {
        this.setState({
            inProgress: false,
        });
        axios
            .post("/bio", this.state)
            .then(({ data }) => {
                this.props.saveBio(data.bio);
            })
            .catch((err) => {
                console.log("Error in /bio in bioeditor.js: ", err);
            });
    }

    render() {
        return (
            <div>
                <p>BIOEDITOR</p>
                {this.state.inProgress && (
                    <div>
                        <textarea
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <button id="save" onClick={(e) => this.writeBio(e)}>
                            Save Bio
                        </button>
                    </div>
                )}
                {!this.props.bio && (
                    <button
                        id="add"
                        onClick={() =>
                            this.setState({
                                inProgress: true,
                            })
                        }
                    >
                        Add Bio
                    </button>
                )}
                {this.props.bio && (
                    <div>
                        <div>{this.props.bio}</div>
                        <button
                            id="edit"
                            onClick={() =>
                                this.setState({
                                    inProgress: true,
                                })
                            }
                        >
                            Edit Bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

// <textarea defaultvalue={this.props.bio}></textarea>
