import React, { Component } from "react";
import axios from "./axios";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        const otheUserId = this.props.match.params.id;
        // make axios request to dynamic route on server asking for info about this user
        // req.params, stick to db query, then state, setState and see it on the other page
        // no need for bio editor component, just read bio
        //handle if user tries to got to own profile (check if userId=currentId, then redirect to profile)
        //handle if user tries to got to profile which does not exist i.e. /user/246243
        // axios.get("api/user/" + id);
    }

    render() {
        return (
            <div>
                <h1>I am Other Profile!</h1>
            </div>
        );
    }
}

export default OtherProfile;
