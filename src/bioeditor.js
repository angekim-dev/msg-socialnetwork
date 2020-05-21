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
            <div className="bio-container">
                {this.state.inProgress && (
                    <div className="bio">
                        <textarea
                            className="bio-text"
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <button onClick={(e) => this.writeBio(e)}>
                            Save Bio
                        </button>
                    </div>
                )}
                {!this.props.bio && (
                    <p
                        id="add-bio"
                        onClick={() =>
                            this.setState({
                                inProgress: true,
                            })
                        }
                    >
                        Tell us more about yourself!
                    </p>
                )}
                {this.props.bio && (
                    <div className="bio">
                        <div className="bio-text">{this.props.bio}</div>
                        <button
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
