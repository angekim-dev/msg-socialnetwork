import React, { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import FriendshipButton from "./friend-button";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: false,
        };
    }

    componentDidMount() {
        // console.log(this.props.match.params.id);
        const otherUserId = this.props.match.params.id;
        // make axios request to dynamic route on server asking for info about this user
        axios
            .get("/api/user/" + otherUserId)
            .then(({ data }) => {
                // console.log("***data: ", data);
                if (data.currentUser || data.noMatch) {
                    // console.log("not current or known user");
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: data.first,
                        last: data.last,
                        imageUrl: data.image_url,
                        bio: data.bio,
                    });
                }
            })
            .catch((err) => {
                console.log("Error in axios.get '/api/user/' + id: ", err);
            });
        // console.log("after axios in api/user", this.state);
    }

    render() {
        return (
            <div className="otherprofile-container">
                <div className="otherprofile">
                    <div className="other">
                        <img
                            src={this.state.imageUrl}
                            alt={`${this.state.first} ${this.state.last}`}
                        />
                    </div>
                    <h3>{this.state.bio}</h3>
                </div>
                <h2>
                    {this.state.first} {this.state.last}
                </h2>
                <FriendshipButton otherId={this.props.match.params.id} />
            </div>
        );
    }
}

export default OtherProfile;
