import React from "react";
import ProfilePic from "./profilepic";

// for rendering profile pic
// doesn't need to be a class

export default function Presentational({ first, last, imageUrl, toggleModal }) {
    // console.log("props in Presentational: ", props);

    return (
        <div>
            <ProfilePic
                first={first}
                last={last}
                imageUrl={imageUrl}
                toggleModal={toggleModal}
            />
        </div>
    );
}
