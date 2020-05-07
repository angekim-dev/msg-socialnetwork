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
        axios.post("/bio", this.state).then(({ data }) => {
            console.log("data in writeBio: ", data);
        });
    }

    render() {
        return (
            <div>
                <p>BIOEDITOR</p>
                <textarea
                    defaultValue={this.props.bio}
                    onChange={(e) => this.handleChange(e)}
                ></textarea>
                <button>Add Bio</button>
                <button>Edit Bio</button>
            </div>
        );
    }
}

// <textarea defaultvalue={this.props.bio}></textarea>
